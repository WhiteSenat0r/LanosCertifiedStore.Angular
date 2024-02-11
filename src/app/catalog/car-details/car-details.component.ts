import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { CatalogService } from '../catalog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  vehicle?: Vehicle;

  constructor(private catalogService:CatalogService, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id) {
      this.catalogService.getVehicle(id).subscribe({
        next: vehicle => {this.vehicle = vehicle; console.log(this.vehicle)},
        error: error => console.error()
      })
    }
   
  }
  
}
