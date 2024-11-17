import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Vehicle } from '../../shared/models/ApiModels/Vehicle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  vehicleCount: number = 20;
  vehicles: Vehicle[] = [];

  constructor(private homeservice: HomeService) { }
  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.homeservice.getVehicles(this.vehicleCount).subscribe({
      next: (response: { items: Vehicle[]}) => {
        this.vehicles = response.items;
      },
      error: (error) => { console.error(error) }
    })
  }

}
