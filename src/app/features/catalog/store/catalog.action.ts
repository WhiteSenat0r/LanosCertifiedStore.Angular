import { CatalogParams } from "../models/catalogParams";

export namespace CatalogActions {
    export class LoadBrands {
        static readonly type = '[Catalog] Load Brands';
    }
    
    export class LoadVehicles {
        static readonly type = '[Catalog] Load Vehicles';

        constructor(public payload: CatalogParams) {}
    }

    export class ShowInfo {
        static readonly type = '[Catalog] Show info';
    }
}