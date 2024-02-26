import { Price } from "./price";
import { Image } from "./image";

export interface ListVehicle{
    id: string;

    color: string;
    description: string;
    type: string;
    brand: string;
    model: string;

    displacement: number;
    price: Price;
    image: Image;
}