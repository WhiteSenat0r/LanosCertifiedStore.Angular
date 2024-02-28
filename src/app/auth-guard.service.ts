import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private accountService: AccountService) { }
  
  // canActivate(): boolean{
  //   if(this.accountService.currentUserSig())
  //   {
  //     return true
  //   }
  //   return false;
  // }
}
