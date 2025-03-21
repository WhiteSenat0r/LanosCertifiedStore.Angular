import { Brand } from "../../../../shared/models/interfaces/vehicle-properties/Brand.interface";
import { LocationRegion } from "../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface";
import { LocationTown } from "../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface";
import { Model } from "../../../../shared/models/interfaces/vehicle-properties/Model.interface";
import { VehicleColor } from "../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface";


export interface VehicleInfoOptions {
    brand: Brand | undefined;
    model: Model | undefined;
    region: LocationRegion | undefined;
    town: LocationTown | undefined;
    color: VehicleColor | undefined;
    lowerPrice: number | undefined;
    upperPrice: number | undefined;
}