import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { TokenResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakUrl = environment.keycloak.url;
  private realm = environment.keycloak.realm;
  private clientId = environment.keycloak.clientId;
  private redirectUri = `${window.location.origin}/auth-callback`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuthentication();
  }

  public login(): void {
    const state = this.generateRandomState();
    sessionStorage.setItem('kc_state', state);

    const currentUrl = this.router.url;
    if (currentUrl !== '/auth-callback') {
      localStorage.setItem('returnUrl', currentUrl);
    }

    const authUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state
    });

    window.location.href = `${authUrl}?${params.toString()}`;
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('kc_token');
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public handleAuthCallback(code: string, state: string): Observable<TokenResponse> {
    const savedState = sessionStorage.getItem('kc_state');
    sessionStorage.removeItem('kc_state');

    if (savedState !== state) {
      return throwError(() => new Error('Invalid state parameter'));
    }

    const tokenUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const body = new URLSearchParams({
      client_id: this.clientId,
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUri,
      scope: 'openid email profile',
      code: code
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>(tokenUrl, body.toString(), { headers }).pipe(
      tap(token => {
        this.saveToken(token);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(err => this.handleTokenError(err))
    );
  }

  public refreshToken(refreshToken: string): Observable<TokenResponse> {
    const tokenUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.clientId,
      refresh_token: refreshToken
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<TokenResponse>(tokenUrl, body.toString(), { headers }).pipe(
      tap(token => {
        this.saveToken(token);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError(err => {
        this.clearStorage();
        this.isAuthenticatedSubject.next(false);
        return this.handleTokenError(err);
      })
    );
  }

 public logout(): void {
  const refreshToken = localStorage.getItem('kc_refresh_token');
  
  // Спочатку очищуємо локальний стан
  this.clearStorage();
  this.isAuthenticatedSubject.next(false);

  // Робимо logout запит до Keycloak
  if (refreshToken) {
    const logoutUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/logout`;
    const body = new URLSearchParams({
      client_id: this.clientId,
      refresh_token: refreshToken
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Відправляємо POST запит для logout
    this.http.post(logoutUrl, body.toString(), { headers }).subscribe({
      next: () => {
        this.clearStorage();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Навіть якщо logout запит провалився, перенаправляємо користувача
        this.router.navigate(['/']);
      }
    });
  } else {
    // Якщо немає refresh token, просто перенаправляємо
    this.router.navigate(['/']);
  }
}

  private saveToken(token: TokenResponse): void {
    localStorage.setItem('kc_token', token.access_token);
    localStorage.setItem('kc_refresh_token', token.refresh_token);

    if (token.expires_in) {
      const exp = Math.floor(Date.now() / 1000) + token.expires_in;
      localStorage.setItem('kc_token_exp', exp.toString());
    }

    if (token.refresh_expires_in) {
      const refreshExp = Math.floor(Date.now() / 1000) + token.refresh_expires_in;
      localStorage.setItem('kc_refresh_token_exp', refreshExp.toString());
    }
  }

  private checkAuthentication(): void {
    const token = localStorage.getItem('kc_token');
    const exp = localStorage.getItem('kc_token_exp');

    if (token && exp) {
      const now = Math.floor(Date.now() / 1000);
      this.isAuthenticatedSubject.next(parseInt(exp, 10) > now);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  private clearStorage(): void {
    localStorage.removeItem('kc_token');
    localStorage.removeItem('kc_refresh_token');
    localStorage.removeItem('kc_token_exp');
    localStorage.removeItem('kc_refresh_token_exp');
    sessionStorage.removeItem('kc_state');
    localStorage.removeItem('returnUrl');
  }

  private handleTokenError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.error?.error_description || error.error?.error || error.message || 'Unknown token error';
    return throwError(() => new Error(`Token error: ${message}`));
  }

  private generateRandomState(): string {
    return window.crypto.randomUUID();
  }

  public getRedirectUri(): string {
    return this.redirectUri;
  }
}