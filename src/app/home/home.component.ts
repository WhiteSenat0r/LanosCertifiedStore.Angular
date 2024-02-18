import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Type } from "../shared/models/type";
import { Brand } from "../shared/models/brand";
import { Vehicle } from '../shared/models/vehicle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  brands: Brand[] = [];
  types: Type[] = [];
  vehicles: Vehicle[] =[];

  constructor(private homeservice: HomeService) { }

  ngOnInit(): void { 
    this.getTypes();
    this.getBrands();
    this.getVehicles();
  }

  getTypes() {
    this.homeservice.getTypes().subscribe({
      next: response =>  this.types = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Types"),
    })
  }

  getBrands() {
    this.homeservice.getBrands().subscribe({
      next: response => this.brands = response,
      error: error => console.error(error),
      complete: () => console.log("GetData Brands"),
    })
  }

  getVehicles() {
    this.homeservice.getVehicles().subscribe({
      next: (response: any) =>  {
        this.vehicles = response.items;
        console.log('Vehicles in component:', this.vehicles);
      },
      error: error => console.error(error),
      complete: () => console.log("GetData Vehicles"),
    })
  }
}
