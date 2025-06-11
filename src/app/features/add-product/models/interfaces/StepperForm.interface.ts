import { FormControl, FormGroup } from '@angular/forms';
import { VType } from '../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { Brand } from '../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { EngineType } from '../../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { DrivetrainType } from '../../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { TransmissionType } from '../../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VehicleColor } from '../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { LocationTown } from '../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { LocationRegion } from '../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
export interface StepperForm {
  startInfo: FormGroup<{
    brand: FormControl<Brand | null>;
    model: FormControl<Model | null>;
    vType: FormControl<VType | null>;
    bodyType: FormControl<BodyType | null>;
    year: FormControl<number | null>;
    mileage: FormControl<number | null>;
  }>;
  additionalInfo: FormGroup<{
    engineType: FormControl<EngineType | null>;
    drivetrainType: FormControl<DrivetrainType | null>;
    transmissionType: FormControl<TransmissionType | null>;
    displacement: FormControl<string | null>;
  }>;
  firstRequestInfo: FormGroup<{
    color: FormControl<VehicleColor | null>;
    town: FormControl<LocationTown | null>;
    region: FormControl<LocationRegion | null>;
    price: FormControl<number | null>;
    description: FormControl<string | null>;
  }>;
}
