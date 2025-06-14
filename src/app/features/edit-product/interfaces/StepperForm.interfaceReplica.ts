import { FormGroup, FormControl } from "@angular/forms";
import { BodyType } from "../../../shared/models/interfaces/vehicle-properties/BodyType.interface";
import { Brand } from "../../../shared/models/interfaces/vehicle-properties/Brand.interface";
import { DrivetrainType } from "../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface";
import { EngineType } from "../../../shared/models/interfaces/vehicle-properties/EngineType.interface";
import { LocationRegion } from "../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface";
import { LocationTown } from "../../../shared/models/interfaces/vehicle-properties/LocationTown.interface";
import { Model } from "../../../shared/models/interfaces/vehicle-properties/Model.interface";
import { TransmissionType } from "../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface";
import { VehicleColor } from "../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface";
import { VType } from "../../../shared/models/interfaces/vehicle-properties/VType.interface";

export interface StepperForm {
  startInfo: FormGroup<{
    brand: FormControl<Brand | null>;
    model: FormControl<Partial<Model> | null>;
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
    vincode: FormControl<string | null>;
  }>;
  firstRequestInfo: FormGroup<{
    color: FormControl<Partial<VehicleColor> | null>;
    town: FormControl<Partial<LocationTown> | null>;
    region: FormControl<LocationRegion | null>;
    price: FormControl<number | null>;
    description: FormControl<string | null>;
  }>;
}
