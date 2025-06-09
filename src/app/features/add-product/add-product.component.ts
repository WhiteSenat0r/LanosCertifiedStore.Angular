import { Component, signal } from '@angular/core';
import { AddProductStages } from './models/enums/AddProductStages.enum';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: ``,
})
export class AddProductComponent {
  //Enums
  AddProductStages = AddProductStages;
  //State
  formStage = signal<AddProductStages>(AddProductStages.start);

  handlePrevButtonClick() {
    this.formStage.update((stage) => stage - 1);
  }
  handleNextButtonClick() {
    this.formStage.update((stage) => stage + 1);
  }
  handleSaveButtonOnStepperFormClick() {
    this.formStage.set(AddProductStages.photosUploadRequest);
  }
}
