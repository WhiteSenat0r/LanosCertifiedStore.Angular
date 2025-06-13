import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
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
import { LocationRegion } from '../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { RawStepperForm } from '../../models/interfaces/RawStepperForm.interface';
import { vinCodeValidator } from '../../../../shared/utils/vinCodeValidator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
})
export class StepperFormComponent implements OnInit {
  readonly toastr = inject(ToastrService);
  //Enums
  AddProductStages = AddProductStages;

  //State
  loading = input.required<boolean>();
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

  //Inputs
  formStage = input.required<AddProductStages>();

  //Outputs
  nextButtonClick = output<void>();
  prevButtonClick = output<void>();
  createAd = output<RawStepperForm>();
  // cancel = output<void>();

  //Hooks
  ngOnInit(): void {
    // this.toastr.error('Не вдалося створити оголошення', 'Помилка', {
    //   timeOut: 4000,
    // });
    if (this.form.controls.startInfo.controls.brand.value === null) {
      this.form.controls.startInfo.controls.model.disable();
    }
    if (this.form.controls.firstRequestInfo.controls.region.value === null) {
      this.form.controls.firstRequestInfo.controls.town.disable();
    }
  }

  //Methods
  onSubmit() {
    const firstRequestGroup = this.form.controls.firstRequestInfo as FormGroup;
    firstRequestGroup.markAllAsTouched();
    if (firstRequestGroup.invalid) {
      console.log('invalid values somewhere');
    } else {
      const rawForm = {
        ...this.form.controls.startInfo.value,
        ...this.form.controls.additionalInfo.value,
        ...this.form.controls.firstRequestInfo.value,
      } as RawStepperForm;

      this.createAd.emit(rawForm);
    }
  }

  handleNextButtonClick() {
    if (this.formStage() === AddProductStages.start) {
      const startGroup = this.form.controls.startInfo as FormGroup;
      startGroup.markAllAsTouched();
      if (!startGroup.invalid) {
        this.nextButtonClick.emit();
      }
    } else if (this.formStage() === AddProductStages.additional) {
      const additionalGroup = this.form.controls.additionalInfo as FormGroup;
      additionalGroup.markAllAsTouched();
      if (!additionalGroup.invalid) {
        this.nextButtonClick.emit();
      }
    }
  }
}
