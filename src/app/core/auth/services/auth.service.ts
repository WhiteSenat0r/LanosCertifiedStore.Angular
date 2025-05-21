// src/app/core/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
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
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  public user$ = this.userSubject.asObservable();
  private tokenRefreshTimeout: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private keycloakService: KeycloakService
  ) {
    // Initialize user from stored token on service creation
    this.initUser();
  }

  /**
   * Initialize user from stored token
   */
  private initUser(): void {
    const token = localStorage.getItem('kc_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const user: UserProfile = {
          id: decodedToken.sub,
          username: decodedToken.preferred_username || '',
          email: decodedToken.email || '',
          firstName: decodedToken.given_name || '',
          lastName: decodedToken.family_name || '',
          roles: this.extractRoles(decodedToken),
          isAuthenticated: true
        };
        this.userSubject.next(user);
        this.scheduleTokenRefresh();
      } catch (error) {
        console.error('Error decoding token:', error);
        this.userSubject.next(null);
      }
    } else {
      this.userSubject.next(null);
    }
  }

  /**
   * Initiate login process
   */
  public login(): void {
    this.keycloakService.login();
  }

  /**
   * Handle the authentication callback
   */
  public handleAuthCallback(code: string, state: string): Observable<boolean> {
    return this.keycloakService.handleAuthCallback(code, state).pipe(
      tap((tokenResponse: TokenResponse) => this.storeTokens(tokenResponse)),
      map(() => true),
      catchError(error => {
        console.error('Auth callback error:', error);
        return of(false);
      })
    );
  }

  /**
   * Logout the user
   */
  public logout(): void {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
    }
    this.keycloakService.logout();
  }

  /**
   * Store tokens from auth response
   */
  private storeTokens(tokenResponse: TokenResponse): void {
    localStorage.setItem('kc_token', tokenResponse.access_token);
    localStorage.setItem('kc_refresh_token', tokenResponse.refresh_token);
    
    // Calculate token expiration time
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + tokenResponse.expires_in;
    localStorage.setItem('kc_token_exp', expiresAt.toString());
    
    // Update user profile
    this.initUser();
    this.scheduleTokenRefresh();
  }

  /**
   * Schedule token refresh before expiration
   */
  private scheduleTokenRefresh(): void {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
    }

    const tokenExp = localStorage.getItem('kc_token_exp');
    if (!tokenExp) {
      return;
    }

    const expiresAt = parseInt(tokenExp, 10);
    const now = Math.floor(Date.now() / 1000);
    
    // Refresh 30 seconds before expiration
    const timeUntilRefresh = Math.max(0, (expiresAt - now - 30) * 1000);
    
    this.tokenRefreshTimeout = setTimeout(() => {
      this.refreshToken();
    }, timeUntilRefresh);
  }

  /**
   * Refresh the access token
   */
  private refreshToken(): void {
    const refreshToken = localStorage.getItem('kc_refresh_token');
    if (!refreshToken) {
      this.logout();
      return;
    }

    this.keycloakService.refreshToken(refreshToken).subscribe({
      next: (response: TokenResponse) => {
        this.storeTokens(response);
      },
      error: () => {
        this.logout();
      }
    });
  }

  /**
   * Extract roles from the token
   */
  private extractRoles(decodedToken: any): string[] {
    if (decodedToken && decodedToken.realm_access && Array.isArray(decodedToken.realm_access.roles)) {
      return decodedToken.realm_access.roles;
    }
    return [];
  }

  /**
   * Check if user has specific role
   */
  public hasRole(role: string): boolean {
    const user = this.userSubject.getValue();
    return user ? user.roles.includes(role) : false;
  }

  /**
   * Check if the user is authenticated
   */
  public isAuthenticated(): boolean {
    const user = this.userSubject.getValue();
    return !!user && user.isAuthenticated;
  }

  /**
   * Get the current authentication token
   */
  public getToken(): string | null {
    return localStorage.getItem('kc_token');
  }

  /**
   * Get the current user profile
   */
  public getCurrentUser(): UserProfile | null {
    return this.userSubject.getValue();
  }
}