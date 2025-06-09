import { FormControl, FormGroup } from '@angular/forms';
import { VType } from '../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { Brand } from '../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
export interface StepperForm {
  startInfo: FormGroup<{
    brand: FormControl<Brand | null>;
    model: FormControl<Model | null>;
    vType: FormControl<VType | null>;
    bodyType: FormControl<BodyType | null>;
    year: FormControl<number | null>;
    mileage: FormControl<number | null>;
  }>;
  additionalInfo: FormGroup<{}>;
}
