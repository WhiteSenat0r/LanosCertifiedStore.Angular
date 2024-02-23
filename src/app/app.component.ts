import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
