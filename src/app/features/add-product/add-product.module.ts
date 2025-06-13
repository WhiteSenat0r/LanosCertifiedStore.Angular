import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { StepperFormComponent } from './ui/stepper-form/stepper-form.component';
import { InfoTitleComponent } from './ui/info-title/info-title.component';
import { StepperElementComponent } from './ui/stepper-element/stepper-element.component';
import { IconCogComponent } from './icons/icon-cog/icon-cog.component';
import { IconCarSportComponent } from './icons/icon-car-sport/icon-car-sport.component';
import { IconDocumentTextComponent } from './icons/icon-document-text/icon-document-text.component';
import { IconPhotoCameraComponent } from './icons/icon-photo-camera/icon-photo-camera.component';
import { IconOutlineCheckComponent } from './icons/icon-outline-check/icon-outline-check.component';
import { IconOutlineChevronRightComponent } from './icons/icon-outline-chevron-right/icon-outline-chevron-right.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdditionalStepComponent } from './ui/stepper-form/additional-step/additional-step.component';
import { StartStepComponent } from './ui/stepper-form/start-step/start-step.component';
import { FirstRequestStepComponent } from './ui/stepper-form/first-request-step/first-request-step.component';
import { PhotoUploadFormComponent } from './ui/photo-upload-form/photo-upload-form.component';
import { IconExitPhotoFormComponent } from './icons/icon-exit-photo-form/icon-exit-photo-form.component';
import { AutocompleteComponent } from '../../shared/ui/form-elements/autocomplete/autocomplete.component';
import { InputWithSymbolComponent } from '../../shared/ui/form-elements/input-with-symbol/input-with-symbol.component';
import { TextareaDefaultComponent } from '../../shared/ui/form-elements/textarea-default/textarea-default.component';
import { PhotoUploaderComponent } from '../../shared/ui/form-elements/photo-uploader/photo-uploader.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AddProductComponent,
    StepperFormComponent,
    InfoTitleComponent,
    StepperElementComponent,
    AdditionalStepComponent,
    StartStepComponent,
    FirstRequestStepComponent,
    PhotoUploadFormComponent,
  ],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    IconCogComponent,
    IconCarSportComponent,
    IconDocumentTextComponent,
    IconPhotoCameraComponent,
    IconOutlineCheckComponent,
    IconOutlineChevronRightComponent,
    ReactiveFormsModule,
    IconExitPhotoFormComponent,
    AutocompleteComponent,
    InputWithSymbolComponent,
    TextareaDefaultComponent,
    PhotoUploaderComponent,
    NgxSpinnerModule,
  ],
})
export class AddProductModule {}
