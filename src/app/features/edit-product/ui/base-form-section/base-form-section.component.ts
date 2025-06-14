import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepperForm } from '../../interfaces/StepperForm.interfaceReplica';

@Component({
  selector: 'app-base-form-section',
  templateUrl: './base-form-section.component.html',
})
export class BaseFormSectionComponent {
  form = input.required<FormGroup<StepperForm>>();
}
