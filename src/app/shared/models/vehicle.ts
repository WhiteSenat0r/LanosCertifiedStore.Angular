import { Price } from "./price";

export interface Vehicle{
    id: string;

    description: string;
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleColor: string;

    displacement: number;
    prices: Price[]
}