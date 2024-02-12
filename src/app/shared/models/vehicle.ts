import { Price } from "./price";

export interface Vehicle{
    id: string;

    description: string;
    type: string;
    brand: string;
    model: string;
    color: string;

    displacement: number;
    prices: Price[]
}