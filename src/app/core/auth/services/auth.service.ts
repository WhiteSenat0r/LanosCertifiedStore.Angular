import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { KeycloakService } from './keycloak.service';
import { TokenResponse, UserProfile } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userProfileSignal = signal<UserProfile | null>(null);
  private isLoadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private authStateSignal = signal<'authenticated' | 'unauthenticated' | 'loading'>('loading');

  public readonly userProfile = computed(() => this.userProfileSignal());
  public readonly isAuthenticated = computed(() => {
    const user = this.userProfileSignal();
    return !!user && user.isAuthenticated;
  });
  public readonly isLoading = computed(() => this.isLoadingSignal());
  public readonly error = computed(() => this.errorSignal());
  public readonly authState = computed(() => this.authStateSignal());
  public readonly userRoles = computed(() => {
    const token = localStorage.getItem('kc_token');
    if (!token) return [];

    try {
      const decodedToken: any = jwtDecode(token);
      return this.extractRoles(decodedToken);
    } catch {
      return [];
    }
  });
  public readonly displayName = computed(() => {
    const user = this.userProfileSignal();
    if (!user) return '';

    const firstName = user.firstName || '';
    const lastName = user.lastName || '';

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else {
      return user.email || 'User';
    }
  });

  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  public user$ = this.userSubject.asObservable();

  private tokenRefreshTimeout: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private keycloakService: KeycloakService
  ) {
    this.initUser();
  }

  private initUser(): void {
    this.setLoadingState(true);
    this.clearError();

    const token = localStorage.getItem('kc_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        const now = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < now) {
          this.attemptTokenRefresh();
          return;
        }

        const user: UserProfile = {
          id: decodedToken.sub,
          email: decodedToken.email || '',
          firstName: decodedToken.given_name || '',
          lastName: decodedToken.family_name || '',
          isAuthenticated: true
        };

        this.setUser(user);
        this.setAuthState('authenticated');
        this.scheduleTokenRefresh();
      } catch (error) {
        this.clearUserData();
        this.setError('Помилка декодування токена');
        this.setAuthState('unauthenticated');
      }
    } else {
      this.clearUserData();
      this.setAuthState('unauthenticated');
    }

    this.setLoadingState(false);
  }

  private setUser(user: UserProfile | null): void {
    this.userProfileSignal.set(user);
    this.userSubject.next(user);
  }

  private setLoadingState(loading: boolean): void {
    this.isLoadingSignal.set(loading);
  }

  private setError(error: string | null): void {
    this.errorSignal.set(error);
  }

  private setAuthState(state: 'authenticated' | 'unauthenticated' | 'loading'): void {
    this.authStateSignal.set(state);
  }

  private clearUserData(): void {
    this.setUser(null);
    localStorage.removeItem('kc_token');
    localStorage.removeItem('kc_refresh_token');
    localStorage.removeItem('kc_token_exp');
    localStorage.removeItem('kc_refresh_token_exp');
    localStorage.removeItem('kc_state');
    this.setAuthState('unauthenticated');
  }

  public login(): void {
    this.setLoadingState(true);
    this.clearError();
    this.setAuthState('loading');
    this.keycloakService.login();
  }

  public handleAuthCallback(code: string, state: string): Observable<boolean> {
    this.setLoadingState(true);
    this.clearError();
    this.setAuthState('loading');

    return this.keycloakService.handleAuthCallback(code, state).pipe(
      tap((tokenResponse: TokenResponse) => {
        console.log('handleAuthCallback: Token response received', tokenResponse);

        if (!tokenResponse.access_token) {
          throw new Error('Access token не отримано');
        }
        if (!tokenResponse.refresh_token) {
          throw new Error('Refresh token не отримано');
        }

        this.storeTokens(tokenResponse);
      }),
      map(() => true),
      catchError(error => {
        let errorMsg = 'Помилка під час авторизації';
        if (error?.message) {
          errorMsg = error.message;
        }

        this.setError(errorMsg);
        this.setAuthState('unauthenticated');
        this.setLoadingState(false);
        return of(false);
      }),
      tap(() => {
        this.setLoadingState(false);
      })
    );
  }

  public logout(): void {//використати observ 
    this.setLoadingState(true);

    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
    }

    this.keycloakService.logout();
    this.clearUserData();

  }

  private storeTokens(tokenResponse: TokenResponse): void {
    if (!tokenResponse.access_token) {
      throw new Error('Access token відсутній в відповіді сервера');
    }

    if (!tokenResponse.refresh_token) {
      throw new Error('Refresh token відсутній в відповіді сервера');
    }

    localStorage.setItem('kc_token', tokenResponse.access_token);
    localStorage.setItem('kc_refresh_token', tokenResponse.refresh_token);

    const expiresAt = Math.floor(Date.now() / 1000) + tokenResponse.expires_in;
    localStorage.setItem('kc_token_exp', expiresAt.toString());

    if (tokenResponse.refresh_expires_in) {
      const refreshExpiresAt = Math.floor(Date.now() / 1000) + tokenResponse.refresh_expires_in;
      localStorage.setItem('kc_refresh_token_exp', refreshExpiresAt.toString());
    }

    try {
      const decodedToken: any = jwtDecode(tokenResponse.access_token);

      const user: UserProfile = {
        id: decodedToken.sub,
        email: decodedToken.email || '',
        firstName: decodedToken.given_name || '',
        lastName: decodedToken.family_name || '',
        isAuthenticated: true
      };

      this.setUser(user);
      this.setAuthState('authenticated');
      this.scheduleTokenRefresh();
    } catch (error) {
      this.clearUserData();
      throw new Error('Помилка декодування токена доступу');
    }
  }

  private attemptTokenRefresh(): void {
    const refreshToken = localStorage.getItem('kc_refresh_token');
    if (!refreshToken) {
      this.clearUserData();
      return;
    }

    this.keycloakService.refreshToken(refreshToken).subscribe({
      next: (response: TokenResponse) => {
        this.storeTokens(response);
      },
      error: (error) => {
        this.clearUserData();
        this.setError('Не вдалося оновити токен. Увійдіть знову.');
      }
    });
  }

  private scheduleTokenRefresh(): void {// переробити, не по часу а коли ми отримаємо 401
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
    }

    const expiresAtStr = localStorage.getItem('kc_token_exp');
    if (!expiresAtStr) return;

    const expiresAt = parseInt(expiresAtStr, 10);
    const now = Math.floor(Date.now() / 1000);

    const timeToExpiry = Math.max(0, (expiresAt - now - 30) * 1000);

    this.tokenRefreshTimeout = setTimeout(() => {
      this.refreshToken();
    }, timeToExpiry);
  }

  private refreshToken(): void {
    const storedRefreshToken = localStorage.getItem('kc_refresh_token');
    if (!storedRefreshToken) {
      this.clearUserData();
      return;
    }

    this.keycloakService.refreshToken(storedRefreshToken).subscribe({
      next: (tokenResponse: TokenResponse) => {
        this.storeTokens(tokenResponse);
      },
      error: (err: unknown) => {
        this.clearUserData();
        this.setError('Не вдалося оновити токен. Увійдіть знову.');
      }
    });
  }

  private extractRoles(decodedToken: any): string[] {
    if (decodedToken && decodedToken.realm_access && Array.isArray(decodedToken.realm_access.roles)) {
      return decodedToken.realm_access.roles;
    }
    return [];
  }

  public hasRole(role: string): boolean {
    const roles = this.userRoles();
    return roles.includes(role);
  }

  public getToken(): string | null {
    return localStorage.getItem('kc_token');
  }

  public getCurrentUser(): UserProfile | null {
    return this.userProfileSignal();
  }

  public clearError(): void {
    this.setError(null);
  }
}