import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { CatalogService } from '../catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'src/app/shared/models/model';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  vehicle?: Vehicle;
  modelsOfBrand?: Model[];

  constructor(private catalogService:CatalogService, private activatedRoute: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.catalogService.getVehicle(id).subscribe({
        next: vehicle => {
          this.vehicle = vehicle;
          this.getModels();
        },
        error: error => console.error(error),
      });
    }
  }

  getModels(){
    this.catalogService.getModels().subscribe({
      next: (response:any) => {
        this.modelsOfBrand = response.filter((model: Model) => model.vehicleBrand === this.vehicle?.brand)
      },
      error: error => console.error(error),
    })
  }

  handleModelClick(model: Model){
    this.router.navigate(['/catalog', model.name, model.vehicleBrand])
  }
}
