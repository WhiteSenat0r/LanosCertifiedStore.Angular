import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BodyType } from '../../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { Brand } from '../../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { VType } from '../../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { VehicleColor } from '../../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { LocationTown } from '../../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { VehicleLookupService } from '../../../../../shared/services/vehicle-lookup.service';
import { ApiResponse } from '../../../../../shared/models/interfaces/api/ApiResponse.interface';

@Component({
  selector: 'app-first-request-step',
  templateUrl: './first-request-step.component.html',
})
export class FirstRequestStepComponent {
  readonly vehicleLookup = inject(VehicleLookupService);

  firstRequestGroup = input.required<
    FormGroup<{
      color: FormControl<VehicleColor | null>;
      town: FormControl<LocationTown | null>;
      price: FormControl<number | null>;
      description: FormControl<string | null>;
    }>
  >();

  colors = signal<VehicleColor[] | undefined>(undefined);
  towns = signal<LocationTown[] | undefined>(undefined);

  //Hooks
  ngOnInit(): void {
    this.getColors();
    this.getTowns();
  }

  //Methods
  getColors() {
    this.vehicleLookup
      .getColors()
      .subscribe((response: ApiResponse<VehicleColor>) => {
        this.colors.set(response.items);
      });
  }
  getTowns() {
    this.vehicleLookup
      .getLocationTowns()
      .subscribe((response: ApiResponse<LocationTown>) => {
        this.towns.set(response.items);
      });
  }
}
