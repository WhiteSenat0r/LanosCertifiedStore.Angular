import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Vehicle } from '../../shared/models/BaseApiModels/Vehicle';
import { BodyType } from '../../shared/models/BaseApiModels/BodyType';
import { Observable } from 'rxjs';
import { EngineType } from '../../shared/models/BaseApiModels/EngineType';
import { ApiResponse } from '../../shared/models/ApiSpecificModels/ApiResponse';
import { PriceRange } from './models/PriceRange';
import { DropdownElementData } from './models/DropdownElementData.enum';
import { LocationRegion } from '../../shared/models/BaseApiModels/LocationRegion';
import { TransmissionType } from '../../shared/models/BaseApiModels/TransmissionType';
import { Brand } from '../../shared/models/BaseApiModels/Brand';
import { Model } from '../../shared/models/BaseApiModels/Model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  DropDownElementUlInfo: string[] = [];

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.homeservice.getDropDownData(ApiCallOption).subscribe({
      next: (response: ApiResponse<Brand | Model | LocationRegion | TransmissionType | EngineType>) => {
          this.DropDownElementUlInfo = response.items.map(item => item.name);
      },  
    })
  }

  vehicleCount: number = 20;
  vehicles: Vehicle[] = [];
  bodyTypes: BodyType[] = [];

  topPriceVehicles: Vehicle[] = [];
  priceRange$!: Observable<PriceRange>;

  constructor(private homeservice: HomeService) {}
  ngOnInit(): void {
    this.getVehicles();
    this.getTopPriceVehicles(50000);
    this.getBodyTypes();

    this.priceRange$ = this.homeservice.getPriceRanges();
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
    this.homeservice
      .getVehicles(undefined, undefined, LowerPriceLimit)
      .subscribe({
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
