import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { CatalogService } from '../catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'src/app/shared/models/model';
import { CatalogParams } from 'src/app/shared/models/catalogParams';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  vehicle?: Vehicle;
  modelsOfBrand?: Model[];
  vehiclesOfType!: Vehicle[];

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bcService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe(params => {
      this.getVehicle();
    });
  }

  catalogParams: CatalogParams = new CatalogParams();

  getVehiclesOfType() {
    this.catalogParams.typeName = this.vehicle!.type;
    this.catalogService.getVehicles(this.catalogParams).subscribe({
      next: (response: any) => {
        this.vehiclesOfType = response.items;
      },
      error: (error) => console.log(error),
    });
  }

  getVehicle() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.catalogService.getVehicle(id).subscribe({
        next: (vehicle) => {
          this.vehicle = vehicle;
          this.getModels();
          this.getVehiclesOfType();

          this.bcService.set('@vehicleElement', vehicle.brand + ' ' + vehicle.model)
        },
        error: (error) => console.error(error),
      });
    }
  }

  getModels() {
    this.catalogService.getModels().subscribe({
      next: (response: any) => {
        this.modelsOfBrand = response.filter(
          (model: Model) => model.vehicleBrand === this.vehicle!.brand
        );
      },
      error: (error) => console.error(error),
    });
  }

  handleModelClick(model: Model) {
    const navigationExtras = {
      queryParams: {
        modelName: model.name,
        brandName: model.vehicleBrand,
      },
    };
    this.router.navigate(['/catalog'], navigationExtras);
  }

  handleChangeVehicleTap(vehicleId: string) {
    this.router.navigate([`/catalog/${vehicleId}`]);
    window.scrollTo(0, 0);
  }
}
