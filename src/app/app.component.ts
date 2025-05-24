import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'web-app';
  isMainPage!: boolean;

  constructor(private router: Router) {}

  ngOnInit(test: string = 'test'): void {
    initFlowbite();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isMainPage = this.router.url === '/' || this.router.url === '/#';
        // console.log('URL changed:', this.router.url);
        // console.log('isMainPage:', this.isMainPage);
      });
  }
}
