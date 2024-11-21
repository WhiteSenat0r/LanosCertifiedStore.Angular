import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Vehicle } from '../../shared/models/ApiModels/Vehicle';
import { BodyType } from '../../shared/models/ApiModels/BodyType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  vehicleCount: number = 20;
  vehicles: Vehicle[] = [];
  bodyTypes: BodyType[] = [];

  topPriceVehicles: Vehicle[] = [];

  constructor(private homeservice: HomeService) {}
  ngOnInit(): void {
    this.getVehicles();
    this.getTopPriceVehicles(50000);
    this.getBodyTypes();
  }

  getVehicles(vehicleCount?: number, bodyTypeId?: string) {
    this.homeservice.getVehicles(vehicleCount, bodyTypeId).subscribe({
      next: (response: { items: Vehicle[] }) => {
        this.vehicles = response.items;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getTopPriceVehicles(LowerPriceLimit: number) {
    this.homeservice.getVehicles(undefined, undefined, LowerPriceLimit).subscribe({
      next: (response: { items: Vehicle[] }) => {
        this.topPriceVehicles = response.items;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getBodyTypes() {
    this.homeservice.getBodyTypes().subscribe({
      next: (response: { items: BodyType[] }) => {
        this.bodyTypes = response.items;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleClickedBodyTypeEvent(bodyType: BodyType) {
    if (bodyType.id !== '0') {
      this.getVehicles(undefined, bodyType.id);
    } else {
      this.getVehicles();
    }
  }
}
