
export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAuthenticated: boolean;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state?: string;
  scope: string;
  id_token?: string;
  'not-before-policy'?: number;
}