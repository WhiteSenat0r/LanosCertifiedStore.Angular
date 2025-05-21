// src/app/core/auth/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // First check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      // Store the attempted URL for redirecting
      localStorage.setItem('returnUrl', state.url);
      
      // Redirect to login
      this.authService.login();
      return false;
    }
    
    // Check if the user has the required roles
    const requiredRoles = route.data['roles'] as Array<string>;
    
    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    
    // Check if the user has at least one of the required roles
    const hasRequiredRole = requiredRoles.some(role => this.authService.hasRole(role));
    
    if (hasRequiredRole) {
      return true;
    }
    
    // Redirect to unauthorized page
    this.router.navigate(['/unauthorized']);
    return false;
  }
}