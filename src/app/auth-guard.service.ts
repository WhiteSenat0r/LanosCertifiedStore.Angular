import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }
  
  canActivate(): boolean{
    if(this.accountService.currentUserSig())
    {
      if(this.accountService.currentUserSig()?.email === 'ouradmin@gmail.com')
      {
        return true;
      }
    }
    else{
      this.router.navigateByUrl('/');
    }
    return false;
  }
}
