import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Brand } from '../../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { VType } from '../../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { BodyType } from '../../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { VehicleLookupService } from '../../../../../shared/services/vehicle-lookup.service';
import { ApiResponse } from '../../../../../shared/models/interfaces/api/ApiResponse.interface';

@Component({
  selector: 'app-start-step',
  templateUrl: './start-step.component.html',
})
export class StartStepComponent implements OnInit {
  readonly vehicleLookup = inject(VehicleLookupService);

  brand = input.required<FormControl<Brand | null>>();
  model = input.required<FormControl<Model | null>>();
  vType = input.required<FormControl<VType | null>>();
  bodyType = input.required<FormControl<BodyType | null>>();
  year = input.required<FormControl<number | null>>();
  mileage = input.required<FormControl<number | null>>();

  brands = signal<Brand[] | undefined>(undefined);
  models = signal<Model[] | undefined>(undefined);
  vTypes = signal<VType[] | undefined>(undefined);
  bodyTypes = signal<BodyType[] | undefined>(undefined);
  years = signal<number[] | undefined>(undefined);

  //Hooks
  ngOnInit(): void {
    this.getBrands();
    this.getVTypes();
    this.getBodyTypes();
    this.getYears();
  }

  //Methods
  getBrands() {
    this.vehicleLookup.getBrands().subscribe((response: ApiResponse<Brand>) => {
      this.brands.set(response.items);
    });
  }
  getModels() {
    if (this.brand().value) {
      this.vehicleLookup
        .getModels(this.brand().value!.id)
        .subscribe((response: ApiResponse<Brand>) => {
          this.brands.set(response.items);
        });
    }
  }
  getVTypes() {
    this.vehicleLookup.getVTypes().subscribe((response: ApiResponse<VType>) => {
      this.vTypes.set(response.items);
    });
  }
  getBodyTypes() {
    this.vehicleLookup
      .getBodyTypes()
      .subscribe((response: ApiResponse<BodyType>) => {
        this.bodyTypes.set(response.items);
      });
  }
  getYears() {
    this.years.set(this.vehicleLookup.getAvailableYearsMock());
  }
}
