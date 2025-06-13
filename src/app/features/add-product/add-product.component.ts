import { Component, inject, signal } from '@angular/core';
import { AddProductStages } from './models/enums/AddProductStages.enum';
import { Router } from '@angular/router';
import { AddProductService } from './services/add-product.service';
import { AdPostPayload } from './models/interfaces/AdPostPayload.interface';
import { RawStepperForm } from './models/interfaces/RawStepperForm.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: ``,
})
export class AddProductComponent {
  readonly router = inject(Router);
  readonly addProductService = inject(AddProductService);
  //Enums
  AddProductStages = AddProductStages;
  //State
  formStage = signal<AddProductStages>(AddProductStages.additional);

  //Handlers
  // Stepper form handlers
  handlePrevButtonClick() {
    this.formStage.update((stage) => stage - 1);
  }
  handleNextButtonClick() {
    this.formStage.update((stage) => stage + 1);
  }
  handleCreateAdStepperFormButtonClick(rawForm: RawStepperForm) {
    const payload: AdPostPayload = {
      brandId: rawForm.brand?.id ?? '',
      modelId: rawForm.model?.id ?? '',
      vehicleTypeId: rawForm.vType?.id ?? '',
      bodyTypeId: rawForm.bodyType?.id ?? '',
      engineTypeId: rawForm.engineType?.id ?? '',
      transmissionTypeId: rawForm.transmissionType?.id ?? '',
      drivetrainTypeId: rawForm.drivetrainType?.id ?? '',
      colorId: rawForm.color?.id ?? '',
      locationTownId: rawForm.town?.id ?? '',
      description: rawForm.description ?? '',
      displacement: Number(rawForm.displacement) || 0,
      price: rawForm.price ?? 0,
      productionYear: rawForm.year ?? 0,
      mileage: rawForm.mileage ?? 0,
      vincode: rawForm.vincode ?? '',
    };

    this.addProductService.postAd(payload).subscribe((response) => {
      // console.log('Response is -> ' + JSON.stringify(response));
    });
    this.formStage.set(AddProductStages.photosUploadRequest);
  }
  // Photo-upload form handlers
  handleCancelUploadedPhotos() {
    this.router.navigate(['/profile']);
  }
}
