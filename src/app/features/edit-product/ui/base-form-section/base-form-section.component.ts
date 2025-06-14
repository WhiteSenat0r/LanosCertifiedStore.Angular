import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepperForm } from '../../../add-product/models/interfaces/StepperForm.interface';

@Component({
  selector: 'app-base-form-section',
  templateUrl: './base-form-section.component.html',
})
export class BaseFormSectionComponent {
  form = input.required<FormGroup<StepperForm>>();
}
