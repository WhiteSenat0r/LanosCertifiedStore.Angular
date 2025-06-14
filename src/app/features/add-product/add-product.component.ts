import { Component, effect, inject, signal } from '@angular/core';
import { AddProductStages } from './models/enums/AddProductStages.enum';
import { Router } from '@angular/router';
import { AddProductService } from './services/add-product.service';
import { AdPostPayload } from './models/interfaces/AdPostPayload.interface';
import { RawStepperForm } from './models/interfaces/RawStepperForm.interface';
import { ToastrService } from 'ngx-toastr';
import { patchState } from '@ngrx/signals';
import {
  tap,
  delay,
  finalize,
  catchError,
  switchMap,
  throwError,
  timer,
} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: ``,
})
export class AddProductComponent {
  readonly toastr = inject(ToastrService);
  readonly router = inject(Router);
  readonly addProductService = inject(AddProductService);
  readonly spinner = inject(NgxSpinnerService);
  //Enums
  AddProductStages = AddProductStages;
  //State
  formStage = signal<AddProductStages>(AddProductStages.start);
  vehicleId = signal<string | undefined>(undefined);
  stepperFormLoading = signal<boolean>(false);
  photoUploaderLoading = signal<boolean>(false);

  //Effects
  stepperSpinnerEffect = effect(() => {
    if (this.stepperFormLoading()) {
      this.spinner.show('stepperFormSpinner');
    } else {
      this.spinner.hide('stepperFormSpinner');
    }
  });
  uploadPhotosSpinnerEffect = effect(() => {
    if (this.photoUploaderLoading()) {
      this.spinner.show('uploadPhotosFormSpinner');
    } else {
      this.spinner.hide('uploadPhotosFormSpinner');
    }
  });

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
    this.stepperFormLoading.set(true);
    this.addProductService
      .postAd(payload)
      .pipe(
        delay(1000),
        catchError((err) =>
          timer(2000).pipe(
            tap(() => this.handleError(err)),
            switchMap(() => throwError(() => err))
          )
        ),
        finalize(() => this.stepperFormLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.vehicleId.set(response);
          this.formStage.set(AddProductStages.photosUploadRequest);
          this.toastr.success('Оголошення створено!', 'Успіх', {
            timeOut: 2000,
          });
        },
      });
  }
  private handleError(err: any) {
    this.toastr.error('Не вдалося створити оголошення', 'Помилка', {
      timeOut: 4000,
    });
    this.router.navigate(['/profile']);
  }
  // Photo-upload form handlers
  handleGoToProfile() {
    this.router.navigate(['/profile']);
  }
  handleUploadPhotos(photos: File[]) {
    if (!this.vehicleId()) {
      this.toastr.error('Відсутній ID авто', 'Помилка', { timeOut: 4000 });
      this.router.navigate(['/profile']);
      return;
    }

    this.photoUploaderLoading.set(true);
    const vehicleId = this.vehicleId() as string;

    this.addProductService
      .uploadPhotos(vehicleId, photos)
      .pipe(
        delay(500), // затримка для UX (можеш прибрати або змінити)
        catchError((err) =>
          timer(2000).pipe(
            tap(() => {
              this.toastr.error('Не вдалося завантажити фото', 'Помилка', {
                timeOut: 1000,
              });
            }),
            switchMap(() => throwError(() => err))
          )
        ),
        finalize(() => {
          this.router.navigate(['/profile']);
          this.photoUploaderLoading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          const message =
            photos.length === 1
              ? 'Фотографія завантажена!'
              : 'Фотографії завантажено!';
          this.toastr.success(message, 'Успіх', { timeOut: 2000 });
        },
      });
  }
}
