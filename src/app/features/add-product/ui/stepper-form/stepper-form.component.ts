import { Component, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProductStages } from '../../models/enums/AddProductStages.enum';
import { StepperForm } from '../../models/interfaces/StepperForm.interface';
import { Brand } from '../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { VType } from '../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { EngineType } from '../../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { DrivetrainType } from '../../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { TransmissionType } from '../../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VehicleColor } from '../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { LocationTown } from '../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
})
export class StepperFormComponent {
  //Enums
  AddProductStages = AddProductStages;

  //State
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
    }),
    firstRequestInfo: new FormGroup({
      color: new FormControl<VehicleColor | null>(null, Validators.required),
      town: new FormControl<LocationTown | null>(null, Validators.required),
      price: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000000),
      ]),
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(2000),
      ]),
    }),
  });

  //Inputs
  formStage = input.required<AddProductStages>();

  //Outputs
  nextButtonClick = output<void>();
  prevButtonClick = output<void>();
  saveButtonClick = output<void>();

  //Methods
  onSubmit() {
    const startGroup = this.form.controls.startInfo as FormGroup;
    const additionalGroup = this.form.controls.additionalInfo as FormGroup;
    const firstRequestGroup = this.form.controls.firstRequestInfo as FormGroup;
    firstRequestGroup.markAllAsTouched();
    if (
      firstRequestGroup.invalid ||
      startGroup.invalid ||
      additionalGroup.invalid
    ) {
      console.log('invalid values somewhere');
    } else {
      console.log('published');
      // this.saveButtonClick.emit();
    }
  }

  handleNextButtonClick() {
    if (this.formStage() === AddProductStages.start) {
      const startGroup = this.form.controls.startInfo as FormGroup;
      startGroup.markAllAsTouched();
      if (startGroup.invalid) {
        console.log(startGroup.controls);
      } else {
        this.nextButtonClick.emit();
      }
    } else if (this.formStage() === AddProductStages.additional) {
      const additionalGroup = this.form.controls.additionalInfo as FormGroup;
      additionalGroup.markAllAsTouched();
      if (additionalGroup.invalid) {
        console.log(additionalGroup.controls);
      } else {
        this.nextButtonClick.emit();
      }
    }
  }
}
