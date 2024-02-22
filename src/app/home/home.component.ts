import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { Vehicle } from '../shared/models/vehicle';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  vehicleCount = 6;

  brands: Brand[] = [];
  types: Type[] = [];
  vehicles: Vehicle[] = [];

  constructor(private homeservice: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.getTypes();
    this.getBrands();
    this.getVehicles();
  }

  getTypes() {
    this.homeservice.getTypes().subscribe({
      next: (response) => (this.types = response),
      error: (error) => console.error(error),
    });
  }

  getBrands() {
    this.homeservice.getBrands().subscribe({
      next: (response) => (this.brands = response),
      error: (error) => console.error(error),
    });
  }

  getVehicles() {
    this.homeservice.getVehicles(this.vehicleCount).subscribe({
      next: (response: any) => {
        this.vehicles = response.items;
      },
      error: (error) => console.error(error),
    });
  }

  handleLookMore(event: boolean | null) {
    if (event === false) {
      this.vehicleCount += 6;
      this.getVehicles();
    } else if (event === true) {
      this.router.navigate(['/catalog']);
    }
  }

  handleTileClick(itemName: string | null) {
    const found = this.types.find(item => item.name === itemName)
    let navigationExtras: NavigationExtras;
    if(found)
    {
       navigationExtras = {
        queryParams: {
          typeName: itemName
        }
      }
    }
    else{
      navigationExtras = {
        queryParams: {
          brandName: itemName
        }
      }
    }
    this.router.navigate(['/catalog'], navigationExtras)
  }
}
