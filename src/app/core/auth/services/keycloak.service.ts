import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakUrl: string;
  private realm: string;
  private clientId: string;
  private redirectUri: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.keycloakUrl = environment.keycloak.url;
    this.realm = environment.keycloak.realm;
    this.clientId = environment.keycloak.clientId;
    this.redirectUri = window.location.origin;
    
    // Check if token exists in local storage
    this.checkAuthentication();
  }

  /**
   * Gets the base URL of the Keycloak server
   */
  public getBaseUrl(): string {
    return this.keycloakUrl;
  }

  /**
   * Initiates the login process by redirecting to Keycloak
   */
  public login(): void {
    // Generate a random state to protect against CSRF
    const state = this.generateRandomState();
    // Store state in local storage to verify later
    localStorage.setItem('kc_state', state);
    
    // Build the authorization URL
    const authUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/auth`;
    const redirectUrl = encodeURIComponent(this.redirectUri);
    
    // Redirect to Keycloak login page
    window.location.href = `${authUrl}?client_id=${this.clientId}&redirect_uri=${redirectUrl}/auth-callback&response_type=code&scope=openid&state=${state}`;
  }

  /**
   * Handles the authentication callback after login
   * @param code The authorization code from Keycloak
   * @param state The state parameter for CSRF protection
   */
  public handleAuthCallback(code: string, state: string): Observable<any> {
    // Verify state to prevent CSRF attacks
    const storedState = localStorage.getItem('kc_state');
    if (state !== storedState) {
      throw new Error('Invalid state parameter');
    }
    
    // Remove state from local storage
    localStorage.removeItem('kc_state');
    
    // Exchange authorization code for tokens
    const tokenUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const payload = {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      code: code,
      redirect_uri: this.redirectUri
    };
    
    // Convert payload to form data
    const formData = new URLSearchParams();
    
    // Безпечно додаємо кожне поле окремо
    formData.append('grant_type', payload.grant_type);
    formData.append('client_id', payload.client_id);
    formData.append('code', payload.code);
    formData.append('redirect_uri', payload.redirect_uri);
    
    return this.http.post(tokenUrl, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  /**
   * Logs out the user
   */
  public logout(): void {
    const logoutUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/logout`;
    const redirectUrl = encodeURIComponent(this.redirectUri);
    
    // Clear tokens and authentication state
    localStorage.removeItem('kc_token');
    localStorage.removeItem('kc_refresh_token');
    localStorage.removeItem('kc_token_exp');
    this.isAuthenticatedSubject.next(false);
    
    // Redirect to Keycloak logout page
    window.location.href = `${logoutUrl}?redirect_uri=${redirectUrl}`;
  }

  /**
   * Refreshes the access token using the refresh token
   */
  public refreshToken(refreshToken: string): Observable<any> {
    const tokenUrl = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const payload = {
      grant_type: 'refresh_token',
      client_id: this.clientId,
      refresh_token: refreshToken
    };
    
    // Convert payload to form data
    const formData = new URLSearchParams();
    
    // Безпечно додаємо кожне поле окремо
    formData.append('grant_type', payload.grant_type);
    formData.append('client_id', payload.client_id);
    formData.append('refresh_token', payload.refresh_token);
    
    return this.http.post(tokenUrl, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  /**
   * Checks if the user is authenticated by verifying token expiration
   */
  private checkAuthentication(): void {
    const token = localStorage.getItem('kc_token');
    const tokenExp = localStorage.getItem('kc_token_exp');
    
    if (token && tokenExp) {
      const now = Math.floor(Date.now() / 1000);
      const expired = parseInt(tokenExp, 10) < now;
      
      this.isAuthenticatedSubject.next(!expired);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  /**
   * Generates a random state string for CSRF protection
   */
  private generateRandomState(): string {
    const array = new Uint32Array(8);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  }
}