import { Component, inject, signal } from '@angular/core';
import { AddProductStages } from './models/enums/AddProductStages.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: ``,
})
export class AddProductComponent {
  readonly router = inject(Router);
  //Enums
  AddProductStages = AddProductStages;
  //State
  formStage = signal<AddProductStages>(AddProductStages.firstRequest);

  //Handlers
  handlePrevButtonClick() {
    this.formStage.update((stage) => stage - 1);
  }
  handleNextButtonClick() {
    this.formStage.update((stage) => stage + 1);
  }
  handleSaveButtonOnStepperFormClick() {
    this.formStage.set(AddProductStages.photosUploadRequest);
  }
  handleCancelUploadPhotos() {
    this.router.navigate(['/profile']);
  }
}
