import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'; 

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent {
  isHomePage: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      // this if is for being sure whether we already navigated to this page
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
      }
    });
  }
}