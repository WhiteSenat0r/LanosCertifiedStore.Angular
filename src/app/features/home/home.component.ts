import { Component, inject, OnInit, signal } from '@angular/core';
import { Vehicle } from '../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { BodyType } from '../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { filter, finalize, forkJoin, map, Observable, tap } from 'rxjs';
import { EngineType } from '../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { PriceRange } from './models/interfaces/PriceRange.interface';
import { DropdownElementData } from './models/enums/DropdownElementData.enum';
import { LocationRegion } from '../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { TransmissionType } from '../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { Brand } from '../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../shared/models/interfaces/vehicle-properties/Model.interface';
import { Router } from '@angular/router';
import { SearchAdvancedParams } from './models/interfaces/SearchAdvancedParams.interface';
import { HomeService } from './services/home.service';
import { ApiResponse } from '../../shared/models/interfaces/api/ApiResponse.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  InfoObjectDataOptionated: {
    ApiCallOption: string;
    DropDownElementUlInfo: Array<{ id: string; name: string }>;
  } = { ApiCallOption: '', DropDownElementUlInfo: [] };

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.homeservice
      .getDropDownData(ApiCallOption)
      .pipe(
        filter(
          (
            response:
              | ApiResponse<
                  Brand | Model | LocationRegion | TransmissionType | EngineType
                >
              | undefined
          ) => {
            return response !== undefined;
          }
        ),
        map(
          (
            response: ApiResponse<
              Brand | Model | LocationRegion | TransmissionType | EngineType
            >
          ) =>
            response.items.map((item) => {
              return {
                id: item.id,
                name: item.name,
              };
            })
        )
      )
      .subscribe((info: { id: string; name: string }[]) => {
        this.InfoObjectDataOptionated = {
          ApiCallOption: ApiCallOption,
          DropDownElementUlInfo: info,
        };
      });
  }

  vehicleCount: number = 20;
  vehicles: Vehicle[] = [];
  bodyTypes: BodyType[] = [];

  filteredBodyTypes: BodyType[] = [];

  topPriceVehicles: Vehicle[] = [];
  priceRange$!: Observable<PriceRange>;

  constructor(private homeservice: HomeService, private router: Router) {}
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
    const vehicleObservables: Observable<ApiResponse<Vehicle>>[] = [];

    this.homeservice.getBodyTypes().subscribe({
      next: (response: { items: BodyType[] }) => {
        this.bodyTypes = response.items;

        // group observables
        response.items.forEach((bodyType) => {
          vehicleObservables.push(
            this.homeservice.getVehicles(undefined, bodyType.id)
          );
        });

        // forkJoin to wait before all the observables will be executed asyncroniously
        // and after that gives us all the results in the same moment.
        forkJoin(vehicleObservables).subscribe({
          next: (vehicleResponses: ApiResponse<Vehicle>[]) => {
            const filteredBodyTypesDataHolder: BodyType[] = [];
            vehicleResponses.forEach((response, index) => {
              if (response.items.length >= 2) {
                filteredBodyTypesDataHolder.push(this.bodyTypes[index]);
              }
            });

            this.filteredBodyTypes = [
              ...this.filteredBodyTypes,
              ...filteredBodyTypesDataHolder,
            ];
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleVehicleCardClick(vehicle: Vehicle) {
    this.router.navigate(['/catalog', vehicle.id]);
  }

  handleClickedBodyTypeEvent(bodyType: BodyType) {
    if (bodyType.id !== '0') {
      this.getVehicles(undefined, bodyType.id);
    } else {
      this.getVehicles();
    }
  }

  handleChangeRouterLink(searchAdvanced: SearchAdvancedParams): void {
    this.router.navigate(['/catalog'], { queryParams: { ...searchAdvanced } });
  }
}
