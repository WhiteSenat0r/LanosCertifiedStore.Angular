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

  private chosenBodyType?: BodyType;
  vehiclesByBodyType: Vehicle[] = [];

  constructor(private homeservice: HomeService) {}
  ngOnInit(): void {
    this.getVehicles();
    this.getBodyTypes();
  }

  getVehicles() {
    this.homeservice.getVehicles().subscribe({
      next: (response: { items: Vehicle[] }) => {
        this.vehicles = response.items;
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
    this.chosenBodyType = bodyType;

    this.homeservice.getVehicles(undefined, this.chosenBodyType.id).subscribe({
      next: (response: { items: Vehicle[] }) => {
        this.vehiclesByBodyType = response.items;
      },
      error: (error) => {
        console.error(error);
      },
    })
  }
}
