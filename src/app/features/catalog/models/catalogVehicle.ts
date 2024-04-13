import { Price } from "src/app/shared/models/price";
import { Image } from "../../../shared/models/image";
export interface CatalogVehicle{
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