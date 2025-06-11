import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Brand } from '../../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { VType } from '../../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { BodyType } from '../../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { VehicleLookupService } from '../../../../../shared/services/vehicle-lookup.service';
import { ApiResponse } from '../../../../../shared/models/interfaces/api/ApiResponse.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-start-step',
  templateUrl: './start-step.component.html',
})
export class StartStepComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly vehicleLookup = inject(VehicleLookupService);

  startGroup = input.required<
    FormGroup<{
      brand: FormControl<Brand | null>;
      model: FormControl<Model | null>;
      vType: FormControl<VType | null>;
      bodyType: FormControl<BodyType | null>;
      year: FormControl<number | null>;
      mileage: FormControl<number | null>;
    }>
  >();

  brands = signal<Brand[] | undefined>(undefined);
  models = signal<Model[] | undefined>(undefined);
  vTypes = signal<VType[] | undefined>(undefined);
  bodyTypes = signal<BodyType[] | undefined>(undefined);
  years = signal<number[] | undefined>(undefined);

  //Hooks
  ngOnInit(): void {
    this.getBrands();
    this.getVTypes();
    this.getBodyTypes();
    this.getYears();

    const modelControl = this.startGroup().controls.model;

    this.startGroup()
      .controls.brand.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((brand) => {
        if (brand) {
          this.vehicleLookup.getModels(brand.id).subscribe((response) => {
            this.models.set(response.items);
            modelControl.enable();
          });
        } else {
          this.models.set(undefined);
          modelControl.disable();
          modelControl.setValue(null);
        }
      });
  }

  //Methods
  getBrands() {
    this.vehicleLookup.getBrands().subscribe((response: ApiResponse<Brand>) => {
      this.brands.set(response.items);
    });
  }
  getVTypes() {
    this.vehicleLookup.getVTypes().subscribe((response: ApiResponse<VType>) => {
      this.vTypes.set(response.items);
    });
  }
  getBodyTypes() {
    this.vehicleLookup
      .getBodyTypes()
      .subscribe((response: ApiResponse<BodyType>) => {
        this.bodyTypes.set(response.items);
      });
  }
  getYears() {
    this.years.set(this.vehicleLookup.getAvailableYearsMock());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
