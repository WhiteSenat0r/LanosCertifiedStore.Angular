import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProductRoutingModule } from './edit-product-routing.module';
import { EditProductComponent } from './edit-product.component';
import { InfoTitleComponent } from './ui/info-title/info-title.component';
import { PhotoUploadSectionComponent } from './ui/photo-upload-section/photo-upload-section.component';
import { BaseFormSectionComponent } from './ui/base-form-section/base-form-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StartStepComponent } from './ui/base-form-section/start-step/start-step.component';
import { FirstRequestStepComponent } from './ui/base-form-section/first-request-step/first-request-step.component';
import { AdditionalStepComponent } from './ui/base-form-section/additional-step/additional-step.component';
import { IconCarSportComponent } from '../add-product/icons/icon-car-sport/icon-car-sport.component';
import { AutocompleteComponent } from '../../shared/ui/form-elements/autocomplete/autocomplete.component';
import { InputWithSymbolComponent } from '../../shared/ui/form-elements/input-with-symbol/input-with-symbol.component';
import { IconCogComponent } from '../add-product/icons/icon-cog/icon-cog.component';
import { TextareaDefaultComponent } from '../../shared/ui/form-elements/textarea-default/textarea-default.component';
import { IconDocumentTextComponent } from '../add-product/icons/icon-document-text/icon-document-text.component';
import { IconPhotoCameraComponent } from "../add-product/icons/icon-photo-camera/icon-photo-camera.component";
import { IconExitPhotoFormComponent } from "../add-product/icons/icon-exit-photo-form/icon-exit-photo-form.component";
import { IconOutlineCheckComponent } from "../add-product/icons/icon-outline-check/icon-outline-check.component";
import { PhotoEditorComponent } from './ui/photo-editor/photo-editor.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    EditProductComponent,
    InfoTitleComponent,
    BaseFormSectionComponent,
    StartStepComponent,
    FirstRequestStepComponent,
    AdditionalStepComponent,
    PhotoUploadSectionComponent
  ],
  imports: [
    CommonModule,
    EditProductRoutingModule,
    ReactiveFormsModule,
    IconCarSportComponent,
    AutocompleteComponent,
    InputWithSymbolComponent,
    IconCogComponent,
    TextareaDefaultComponent,
    IconDocumentTextComponent,
    IconPhotoCameraComponent,
    IconExitPhotoFormComponent,
    IconOutlineCheckComponent,
    PhotoEditorComponent,
    NgxSpinnerModule
],
})
export class EditProductModule {}
