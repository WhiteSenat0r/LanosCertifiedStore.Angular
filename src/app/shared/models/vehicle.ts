import { Price } from "./price";

export interface Vehicle{
    id: string;

    color: string;
    description: string;
    type: string;
    brand: string;
    model: string;

    displacement: number;
    prices: Price[]
}