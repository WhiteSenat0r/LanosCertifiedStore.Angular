import { LiveBodyType } from "./vehicleProperties/LiveBodyType.interface";
import { LiveDrivetrainType } from "./vehicleProperties/LiveDrivetrainType.interface";
import { LiveEngineType } from "./vehicleProperties/LiveEngineType.interface";
import { LiveTransmissionType } from "./vehicleProperties/LiveTransmissionType.interface";
import { LiveVType } from "./vehicleProperties/LiveVType.interface";

export interface VehicleInfoArrays {
  engineTypeIds: LiveEngineType[];
  drivetrainTypeIds: LiveDrivetrainType[];
  bodyTypeIds: LiveBodyType[];
  transmissionTypeIds: LiveTransmissionType[];
  vTypeIds: LiveVType[];
}
