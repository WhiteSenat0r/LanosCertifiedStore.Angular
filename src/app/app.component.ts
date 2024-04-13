import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

import { Router } from '@angular/router';

import { AccountService } from './account/account.service';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  http = inject(HttpClient);
  toastr = inject(ToastrService);

  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
    this.http
      .get<{ user: User }>('https://api.realworld.io/api/user')
      .subscribe({
        next: (response) => {
          this.accountService.currentUserSig.set(response.user);
          
        },
        error: () => {
          //this.toastr.error("401", "Ти шо дядь, не туда попав? Ану пішов звідси");
          this.accountService.currentUserSig.set(null);
        }
      });
  }

  constructor(private router: Router) {}

  isAccountModule(): boolean {
    return this.router.url.includes('account');
  }

  isDashboardModule(): boolean {
    return this.router.url.includes('dashboard');
  }

  isTestErrorsPage(): boolean {
    return this.router.url.includes('test-errors');
  }

  logout() {
    console.log('user is logged out');
    localStorage.setItem('token', '');
    this.accountService.currentUserSig.set(null);
  }
}
