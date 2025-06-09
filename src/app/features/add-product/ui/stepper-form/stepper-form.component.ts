import { Component, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProductStages } from '../../models/enums/AddProductStages.enum';
import { StepperForm } from '../../models/interfaces/StepperForm.interface';
import { Brand } from '../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { VType } from '../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';

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
        Validators.maxLength(10),
      ]),
    }),
    additionalInfo: new FormGroup({}),
  });

  //Inputs
  formStage = input.required<AddProductStages>();

  //Outputs
  nextButtonClick = output<void>();
  prevButtonClick = output<void>();
  saveButtonClick = output<void>();

  //Methods
  onSubmit() {
    console.log('published');
  }

  handleNextButtonClick() {
    if (this.formStage() === AddProductStages.start) {
      const startGroup = this.form.controls.startInfo as FormGroup;

      if (startGroup.invalid) {
      } else {
        this.nextButtonClick.emit();
      }
    }
  }
}
