import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'web-app';
  isMainPage!: boolean;
  readonly spinner = inject(NgxSpinnerService);

  spinnerPageLoading= signal<boolean>(true);

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

    this.spinnerPageLoading.set(true);
    this.spinner.show('mainPageLoaderSpinner');

    setTimeout(() => {
      this.spinnerPageLoading.set(false);
      setTimeout(() => {
        this.spinner.hide('mainPageLoaderSpinner');
      }, 5000);
    }, 1000);
  }
}
