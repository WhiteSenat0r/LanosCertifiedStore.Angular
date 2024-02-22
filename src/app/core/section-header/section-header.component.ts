import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'; 

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent {
  isHomePage: boolean;

  constructor(private router: Router) {
    this.isHomePage = this.router.url === '/';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
      }
    });
  }
}