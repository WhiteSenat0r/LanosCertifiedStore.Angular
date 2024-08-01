import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { BodyType } from '../../shared/models/BodyType';
import { Brand } from '../../shared/models/Brand';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  bodyTypes: BodyType[] = [];
  brands: Brand[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getBodyTypes();
    this.getBrands();
  }

  getBodyTypes() {
    this.homeService.getBodyTypes().subscribe({
      next: (response: any) => {
        console.log(response.items);
        this.bodyTypes = response.items;
      },
    });
  }

  getBrands() {
    this.homeService.getBrands().subscribe({
      next: (response: any) => {
        console.log(response.items);
        this.brands = response.items;
      },
    });
  }
}
