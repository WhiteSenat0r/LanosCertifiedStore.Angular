import { BodyType } from "../../../../shared/models/interfaces/vehicle-properties/BodyType.interface";
import { Brand } from "../../../../shared/models/interfaces/vehicle-properties/Brand.interface";
import { DrivetrainType } from "../../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface";
import { EngineType } from "../../../../shared/models/interfaces/vehicle-properties/EngineType.interface";
import { LocationRegion } from "../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface";
import { LocationTown } from "../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface";
import { Model } from "../../../../shared/models/interfaces/vehicle-properties/Model.interface";
import { TransmissionType } from "../../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface";
import { VehicleColor } from "../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface";
import { VType } from "../../../../shared/models/interfaces/vehicle-properties/VType.interface";

export interface RawStepperForm {
  brand: Brand | null;
  model: Model | null;
  vType: VType | null;
  bodyType: BodyType | null;
  year: number | null;
  mileage: number | null;
  engineType: EngineType | null;
  drivetrainType: DrivetrainType | null;
  transmissionType: TransmissionType | null;
  displacement: string | null;
  color: VehicleColor | null;
  town: LocationTown | null;
  region: LocationRegion | null;
  price: number | null;
  description: string | null;
  vincode: string | null;
}
