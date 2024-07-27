import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { BodyType } from '../../shared/models/BodyType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  bodyTypes: BodyType[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getBodyTypes();
  }

  getBodyTypes() {
    this.homeService.getBodyTypes().subscribe({
      next: (response: any) => {
        console.log(response.items);
        this.bodyTypes = response.items;
      },
    });
  }
}
