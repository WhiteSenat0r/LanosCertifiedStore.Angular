import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiResponse } from '../../../../../shared/models/interfaces/api/ApiResponse.interface';
import { DrivetrainType } from '../../../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { EngineType } from '../../../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { TransmissionType } from '../../../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VehicleLookupService } from '../../../../../shared/services/vehicle-lookup.service';

@Component({
  selector: 'app-additional-step',
  templateUrl: './additional-step.component.html',
})
export class AdditionalStepComponent {
  readonly vehicleLookup = inject(VehicleLookupService);

  additionalGroup = input.required<
    FormGroup<{
      engineType: FormControl<EngineType | null>;
      drivetrainType: FormControl<DrivetrainType | null>;
      transmissionType: FormControl<TransmissionType | null>;
      displacement: FormControl<string | null>;
      vincode: FormControl<string | null>;
    }>
  >();

  engines = signal<EngineType[] | undefined>(undefined);
  drivetrains = signal<DrivetrainType[] | undefined>(undefined);
  transmissions = signal<TransmissionType[] | undefined>(undefined);

  //Hooks
  ngOnInit(): void {
    this.getEngines();
    this.getDrivetrains();
    this.getTransmissions();
  }

  //Methods
  getEngines() {
    this.vehicleLookup
      .getEngineTypes()
      .subscribe((response: ApiResponse<EngineType>) => {
        this.engines.set(response.items);
      });
  }
  getDrivetrains() {
    this.vehicleLookup
      .getDrivetrainTypes()
      .subscribe((response: ApiResponse<DrivetrainType>) => {
        this.drivetrains.set(response.items);
      });
  }
  getTransmissions() {
    this.vehicleLookup
      .getTransmissionTypes()
      .subscribe((response: ApiResponse<TransmissionType>) => {
        this.transmissions.set(response.items);
      });
  }
}
