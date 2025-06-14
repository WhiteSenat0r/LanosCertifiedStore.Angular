import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BodyType } from '../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { Brand } from '../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { DrivetrainType } from '../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { EngineType } from '../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { LocationRegion } from '../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { Model } from '../../shared/models/interfaces/vehicle-properties/Model.interface';
import { TransmissionType } from '../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VehicleColor } from '../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { VType } from '../../shared/models/interfaces/vehicle-properties/VType.interface';
import { vinCodeValidator } from '../../shared/utils/vinCodeValidator';
import { StepperForm } from '../add-product/models/interfaces/StepperForm.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent {
  onSubmit() {}

  form = new FormGroup<StepperForm>({
    startInfo: new FormGroup({
      brand: new FormControl<Brand | null>(null, Validators.required),
      model: new FormControl<Model | null>(null, Validators.required),
      vType: new FormControl<VType | null>(null, Validators.required),
      bodyType: new FormControl<BodyType | null>(null, Validators.required),
      year: new FormControl<number | null>(null, Validators.required),
      mileage: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999999999),
        Validators.pattern(/^\d+$/),
      ]),
    }),
    additionalInfo: new FormGroup({
      engineType: new FormControl<EngineType | null>(null, Validators.required),
      drivetrainType: new FormControl<DrivetrainType | null>(
        null,
        Validators.required
      ),
      transmissionType: new FormControl<TransmissionType | null>(
        null,
        Validators.required
      ),
      displacement: new FormControl<string | null>(null, [
        Validators.required, // Accept numbers like "1", "0.5", "2.4" but not "2.45", negative, zero or letters
        Validators.pattern(/^(0\.[5-9]|[1-9](\.[0-9])?)$/),
      ]),
      vincode: new FormControl<string | null>(null, [
        Validators.required,
        vinCodeValidator(),
      ]),
    }),
    firstRequestInfo: new FormGroup({
      color: new FormControl<VehicleColor | null>(null, Validators.required),
      town: new FormControl<LocationTown | null>(null, Validators.required),
      region: new FormControl<LocationRegion | null>(null, Validators.required),
      price: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000000),
        Validators.pattern(/^\d+$/),
      ]),
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(2000),
      ]),
    }),
  });
}
