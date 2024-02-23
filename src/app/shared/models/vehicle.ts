import { Price } from "./price";
import { Image } from "./image";

export interface Vehicle{
    id: string;

    color: string;
    description: string;
    type: string;
    brand: string;
    model: string;

    displacement: number;
    prices: Price[];
    images: Image[];
}