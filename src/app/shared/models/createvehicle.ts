export class CreateVehicle{
    color: string;
    description: string;
    type: string;
    brand: string;
    model: string;

    displacement: number;
    prices: number;

    constructor(type: string, brand:string, model:string, color:string, displacement:number, prices:number, descrition:string)
    {
        this.type = type;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.displacement = displacement;
        this.prices = prices;
        this.description = descrition;
    }
}