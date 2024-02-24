import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

import { Router } from '@angular/router';

import { AccountService } from './account/account.service';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  


  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url.includes('login');
  }

  isRegisterPage(): boolean {
    return this.router.url.includes('register');
  }

  isDashboardPage(): boolean {
    return this.router.url.includes('dashboard');
  }
}
