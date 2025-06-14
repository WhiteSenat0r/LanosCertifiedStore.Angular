import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BodyType } from '../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { Brand } from '../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { DrivetrainType } from '../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { EngineType } from '../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { LocationRegion } from '../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { Model } from '../../shared/models/interfaces/vehicle-properties/Model.interface';
import { TransmissionType } from '../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VehicleColor } from '../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { VType } from '../../shared/models/interfaces/vehicle-properties/VType.interface';
import { vinCodeValidator } from '../../shared/utils/vinCodeValidator';
import { fileCountValidator } from '../../shared/utils/fileCountValidator';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product/services/product.service';
import { VehicleLookupService } from '../../shared/services/vehicle-lookup.service';
import {
  catchError,
  finalize,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { EditProductService } from './edit-product.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdPostPayload } from '../add-product/models/interfaces/AdPostPayload.interface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit {
  //Injections
  readonly toastr = inject(ToastrService);
  readonly route = inject(ActivatedRoute);
  readonly productService = inject(ProductService);
  readonly editProductService = inject(EditProductService);
  private lookupService = inject(VehicleLookupService);
  readonly spinner = inject(NgxSpinnerService);
  originalImages: {
    cloudImageId: string;
    imageUrl: string;
    isMainImage: boolean;
  }[] = [];
  vehicleId: string = '';
  loading = signal<boolean>(false);
  readonly router = inject(Router);

  onSubmit() {
    this.loading.set(true);

    // 1. Формуємо об’єкт для основних даних з форми (stepper)
    const stepper = this.form.controls.stepper;

    const payload: AdPostPayload = {
      brandId: stepper.controls.startInfo.value.brand?.id ?? '',
      modelId: stepper.controls.startInfo.value.model?.id ?? '',
      vehicleTypeId: stepper.controls.startInfo.value.vType?.id ?? '',
      bodyTypeId: stepper.controls.startInfo.value.bodyType?.id ?? '',
      engineTypeId: stepper.controls.additionalInfo.value.engineType?.id ?? '',
      transmissionTypeId:
        stepper.controls.additionalInfo.value.transmissionType?.id ?? '',
      drivetrainTypeId:
        stepper.controls.additionalInfo.value.drivetrainType?.id ?? '',
      colorId: stepper.controls.firstRequestInfo.value.color?.id ?? '',
      locationTownId: stepper.controls.firstRequestInfo.value.town?.id ?? '',
      description: stepper.controls.firstRequestInfo.value.description ?? '',
      displacement:
        Number(stepper.controls.additionalInfo.value.displacement) || 0,
      price: stepper.controls.firstRequestInfo.value.price ?? 0,
      productionYear: stepper.controls.startInfo.value.year ?? 0,
      mileage: stepper.controls.startInfo.value.mileage ?? 0,
      vincode: stepper.controls.additionalInfo.value.vincode ?? '',
    };

    console.log('payload is - ' + JSON.stringify(payload));

    // 2. Оновлюємо основні дані (тут заміни updateAd на свій метод)
    this.editProductService.updateAd(this.vehicleId, payload).subscribe({
      next: () => {
        // 3. Після успішного оновлення основних даних — запускаємо твою логіку з фото

        const currentFiles: File[] =
          this.form.controls.photosUploader.controls.photos.value ?? [];

        const currentCloudImageIds = currentFiles
          .map((file) => {
            const match = file.name.match(/^photo_(.+)\./);
            return match ? match[1] : null;
          })
          .filter((id): id is string => id !== null);

        const newFiles = currentFiles.filter((file) => {
          return !/^photo_.+\./.test(file.name);
        });

        const deletedImages = this.originalImages.filter(
          (img) => !currentCloudImageIds.includes(img.cloudImageId)
        );

        const deleteObservables = [];
        let hasChanges = false;

        for (const img of deletedImages) {
          if (img.isMainImage) {
            this.toastr.error(
              `Головне фото не могло бути видалене!`,
              'Помилка',
              {
                timeOut: 4000,
              }
            );
            continue;
          }
          hasChanges = true;
          deleteObservables.push(
            this.editProductService
              .deleteImage(this.vehicleId, img.cloudImageId)
              .pipe(
                catchError((err) => {
                  this.toastr.error(
                    `Не вдалося видалити фото ${img.cloudImageId}`,
                    'Помилка',
                    { timeOut: 4000 }
                  );
                  return of(null);
                })
              )
          );
        }

        let uploadObservable: Observable<any[]> = of([]);
        if (newFiles.length > 0) {
          hasChanges = true;
          uploadObservable = this.editProductService
            .uploadPhotos(this.vehicleId, newFiles)
            .pipe(
              map((uploadedImages: any[] | null) => uploadedImages ?? []),
              tap((uploadedImages: any[]) => {
                uploadedImages.forEach((img) => {
                  this.originalImages.push({
                    cloudImageId: img.cloudImageId,
                    imageUrl: img.imageUrl,
                    isMainImage: img.isMainImage ?? false,
                  });
                });
              }),
              catchError((err) => {
                this.toastr.error('Помилка при додаванні фото');
                console.log('Error in newFiles', err);
                return of([]);
              })
            );
        }

        forkJoin([...deleteObservables, uploadObservable]).subscribe({
          next: () => {
            if (hasChanges) {
              this.toastr.success('Фотографії оновлено', 'Успіх', {
                timeOut: 2000,
              });
            } else {
              this.toastr.success('Дані оголошення оновлено', 'Успіх', {
                timeOut: 2000,
              });
            }
            this.router.navigate(['/profile']);
          },
          error: () => {
            this.toastr.error('Сталася помилка при оновленні фотографій');
          },
          complete: () => {
            this.loading.set(false);
          },
        });

        // Якщо нічого не змінено — не потрібно знімати loading тут, це робить forkJoin
      },
      error: (err: any) => {
        this.toastr.error('Помилка при оновленні даних оголошення');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
  ///////////// HOOOOOKS

  ngOnInit(): void {
    this.form.markAllAsTouched();
    if (
      this.form.controls.stepper.controls.startInfo.controls.brand.value ===
      null
    ) {
      this.form.controls.stepper.controls.startInfo.controls.model.disable();
    }
    if (
      this.form.controls.stepper.controls.firstRequestInfo.controls.region
        .value === null
    ) {
      this.form.controls.stepper.controls.firstRequestInfo.controls.town.disable();
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.vehicleId = id;

    this.productService.getVehicle(id).subscribe((vehicle) => {
      forkJoin({
        brands: this.lookupService.getBrands(),
        regions: this.lookupService.getLocationRegions(),
      }).subscribe(({ brands, regions }) => {
        const brand = brands.items.find((b) => b.name === vehicle.brand);
        const region = regions.items.find((r) => r.name === vehicle.region);

        if (!brand) {
          console.error(`Бренд '${vehicle.brand}' не знайдено`);
          return;
        }
        if (!region) {
          console.error(`Регіон '${vehicle.region}' не знайдено`);
          return;
        }

        forkJoin({
          models: this.lookupService.getModels(brand.id),
          towns: this.lookupService.getLocationTowns(region.id),
          brands: of(brands),
          regions: of(regions),
          vTypes: this.lookupService.getVTypes(),
          drivetrainTypes: this.lookupService.getDrivetrainTypes(),
          engineTypes: this.lookupService.getEngineTypes(),
          transmissionTypes: this.lookupService.getTransmissionTypes(),
          bodyTypes: this.lookupService.getBodyTypes(),
          colors: this.lookupService.getColors(),
        }).subscribe((data) => {
          const model = data.models.items.find((m) => m.name === vehicle.model);
          const vType = data.vTypes.items.find((v) => v.name === vehicle.type);
          const drivetrainType = data.drivetrainTypes.items.find(
            (d) => d.name === vehicle.drivetrainType
          );
          const engineType = data.engineTypes.items.find(
            (e) => e.name === vehicle.engineType
          );
          const transmissionType = data.transmissionTypes.items.find(
            (t) => t.name === vehicle.transmissionType
          );
          const bodyType = data.bodyTypes.items.find(
            (b) => b.name === vehicle.bodyType
          );
          const color = data.colors.items.find((c) => c.name === vehicle.color);
          const town = data.towns.items.find((t) => t.name === vehicle.town);

          this.form.controls.stepper.patchValue({
            startInfo: {
              brand,
              model,
              vType,
              bodyType,
              year: vehicle.productionYear,
              mileage: vehicle.mileage,
            },
            additionalInfo: {
              engineType,
              drivetrainType,
              transmissionType,
              displacement: vehicle.displacement.toString(),
              vincode: vehicle.vincode,
            },
            firstRequestInfo: {
              color,
              region,
              town,
              price: vehicle.prices?.[0]?.value ?? null,
              description: vehicle.description,
            },
          });

          this.handleDependentControls();

          this.originalImages = (vehicle.images ?? [])
            .slice()
            .sort((a, b) => {
              if (a.isMainImage && !b.isMainImage) return -1;
              if (!a.isMainImage && b.isMainImage) return 1;
              return 0;
            })
            .map((img) => ({
              cloudImageId: img.cloudImageId,
              imageUrl: img.imageUrl,
              isMainImage: img.isMainImage,
            }));

          // Передаємо відсортований масив, щоб файли у формі теж були відсортовані
          this.transformImageUrlsToFiles$(
            vehicle.images?.slice().sort((a, b) => {
              if (a.isMainImage && !b.isMainImage) return -1;
              if (!a.isMainImage && b.isMainImage) return 1;
              return 0;
            }) ?? []
          ).subscribe({
            next: (files) => {
              this.form.controls.photosUploader.patchValue({ photos: files });
            },
            error: (err) => {
              console.error('Помилка при завантаженні фото:', err);
            },
          });
        });
      });
    });

    this.form.controls.photosUploader.controls.photos.valueChanges.subscribe({
      next: (files: File[] | null) => {
        if (!files || files.length === 0) return;

        // Знайти старе головне фото
        const oldMain = this.originalImages.find((img) => img.isMainImage);
        if (!oldMain) return;

        // Визначити fileId у файлі на позиції 0 (наприклад, з імені)
        const firstFile = files[0];
        const match = firstFile.name.match(/^photo_(.+)\./);
        if (!match) return;
        const newMainId = match[1];

        // Якщо головне фото не змінилося, нічого не робимо
        if (oldMain.cloudImageId === newMainId) return;

        // Інакше оновлюємо originalImages
        this.originalImages = this.originalImages.map((img) => ({
          ...img,
          isMainImage: img.cloudImageId === newMainId,
        }));

        // Викликаємо оновлення на бекенд
        this.updateMainImage(newMainId);
      },
    });
  }

  form = new FormGroup({
    photosUploader: new FormGroup({
      photos: new FormControl<File[] | null>(null, fileCountValidator(1, 5)),
    }),

    stepper: new FormGroup({
      startInfo: new FormGroup({
        brand: new FormControl<Brand | null>(null, Validators.required),
        model: new FormControl<Partial<Model> | null>(
          null,
          Validators.required
        ),
        vType: new FormControl<VType | null>(null, Validators.required),
        bodyType: new FormControl<BodyType | null>(null, Validators.required),
        year: new FormControl<number | null>(null, Validators.required),
        mileage: new FormControl<number | null>(null, [
          Validators.required,
          Validators.min(0),
          Validators.max(9999999999),
          Validators.pattern(/^\d+$/),
        ]),
      }),

      additionalInfo: new FormGroup({
        engineType: new FormControl<EngineType | null>(
          null,
          Validators.required
        ),
        drivetrainType: new FormControl<DrivetrainType | null>(
          null,
          Validators.required
        ),
        transmissionType: new FormControl<TransmissionType | null>(
          null,
          Validators.required
        ),
        displacement: new FormControl<string | null>(null, [
          Validators.required,
          Validators.pattern(/^(0\.[5-9]|[1-9](\.[0-9])?)$/),
        ]),
        vincode: new FormControl<string | null>(null, [
          Validators.required,
          vinCodeValidator(),
        ]),
      }),

      firstRequestInfo: new FormGroup({
        color: new FormControl<Partial<VehicleColor> | null>(
          null,
          Validators.required
        ),
        town: new FormControl<Partial<LocationTown> | null>(
          null,
          Validators.required
        ),
        region: new FormControl<LocationRegion | null>(
          null,
          Validators.required
        ),
        price: new FormControl<number | null>(null, [
          Validators.required,
          Validators.min(0),
          Validators.max(1000000000),
          Validators.pattern(/^\d+$/),
        ]),
        description: new FormControl<string | null>(null, [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(2000),
        ]),
      }),
    }),
  });

  //EFFECTS
  stepperSpinnerEffect = effect(() => {
    if (this.loading()) {
      this.spinner.show('editSpinnerForm');
    } else {
      this.spinner.hide('editSpinnerForm');
    }
  });

  private handleDependentControls() {
    const s = this.form.controls.stepper;
    if (!s.controls.startInfo.controls.brand.value) {
      s.controls.startInfo.controls.model.disable();
    }
    const f = s.controls.firstRequestInfo;
    if (!f.controls.region.value) {
      f.controls.town.disable();
    }
  }
  private transformImageUrlsToFiles$(
    images: { cloudImageId: string; imageUrl: string }[]
  ): Observable<File[]> {
    const fileObservables = images.map((img) =>
      from(fetch(img.imageUrl)).pipe(
        switchMap((response) => from(response.blob())),
        map((blob) => {
          const extension = blob.type.split('/')[1] ?? 'jpg';
          // Ім'я файлу формуємо так: photo_{cloudImageId}.{extension}
          const filename = `photo_${img.cloudImageId}.${extension}`;
          return new File([blob], filename, { type: blob.type });
        })
      )
    );

    return forkJoin(fileObservables);
  }

  private updateMainImage(imageId: string) {
    this.editProductService.setMainImage(this.vehicleId, imageId).subscribe({
      next: () => {
        this.toastr.success('Головне фото успішно оновлено');
      },
      error: (err) => {
        this.toastr.error('Не вдалося оновити головне фото');
        console.error('Помилка оновлення головного фото:', err);
      },
    });
  }
}
