import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiResponse } from '../../../../../shared/models/interfaces/api/ApiResponse.interface';
import { LocationRegion } from '../../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { VehicleColor } from '../../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { VehicleLookupService } from '../../../../../shared/services/vehicle-lookup.service';

@Component({
  selector: 'app-first-request-step',
  templateUrl: './first-request-step.component.html',
})
export class FirstRequestStepComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly vehicleLookup = inject(VehicleLookupService);

  firstRequestGroup = input.required<
    FormGroup<{
      color: FormControl<VehicleColor | null>;
      town: FormControl<LocationTown | null>;
      region: FormControl<LocationRegion | null>;
      price: FormControl<number | null>;
      description: FormControl<string | null>;
    }>
  >();

  colors = signal<VehicleColor[] | undefined>(undefined);
  towns = signal<LocationTown[] | undefined>(undefined);
  regions = signal<LocationRegion[] | undefined>(undefined);

  //Hooks
  ngOnInit(): void {
    this.getColors();
    this.getRegions();

    const townControl = this.firstRequestGroup().controls.town;
    this.firstRequestGroup()
      .controls.region.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((region) => {
        if (region) {
          this.vehicleLookup
            .getLocationTowns(region.id)
            .subscribe((response) => {
              this.towns.set(response.items);
              townControl.enable();
            });
        } else {
          this.towns.set(undefined);
          townControl.disable();
          townControl.setValue(null);
        }
      });
  }

  //Methods
  getColors() {
    this.vehicleLookup
      .getColors()
      .subscribe((response: ApiResponse<VehicleColor>) => {
        this.colors.set(response.items);
      });
  }
  getRegions() {
    this.vehicleLookup
      .getLocationRegions()
      .subscribe((response: ApiResponse<LocationRegion>) => {
        this.regions.set(response.items);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
