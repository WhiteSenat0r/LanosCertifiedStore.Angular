import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  UserProfileVisible: boolean = false;

  constructor(public accountService: AccountService){}

  toggleUserInfo()
  {
    this.UserProfileVisible = !this.UserProfileVisible;
  }
  
  loggout()
  {
    this.accountService.currentUserSig.set(null);
    localStorage.setItem('token', '');
  }
}
