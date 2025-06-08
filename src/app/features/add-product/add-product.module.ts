import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { StepperFormComponent } from './ui/stepper-form/stepper-form.component';
import { InfoTitleComponent } from './ui/info-title/info-title.component';
import { StepperElementComponent } from './ui/stepper-element/stepper-element.component';
import { FirstStepContainerComponent } from './ui/stepper-form/first-step-container/first-step-container.component';
import { SecondStepContainerComponent } from './ui/stepper-form/second-step-container/second-step-container.component';

@NgModule({
  declarations: [AddProductComponent, StepperFormComponent, InfoTitleComponent, StepperElementComponent, FirstStepContainerComponent, SecondStepContainerComponent],
  imports: [CommonModule, AddProductRoutingModule],
})
export class AddProductModule {}
