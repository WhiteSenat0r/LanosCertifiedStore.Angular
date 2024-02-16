import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { Color } from '../shared/models/color';
import { Model } from "../shared/models/model";
import { Displacement } from "../shared/models/displacement";
import { CreateVehicle } from "../shared/models/createvehicle";

@Injectable({
    providedIn: 'root'
})

export class AddcarformService {
    private baseUrl = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    getModel() {
        return this.http.get<Model[]>(this.baseUrl + 'Models');
    }

    getBrands() {
        return this.http.get<Brand[]>(this.baseUrl + 'Brands');
    }

    getTypes() {
        return this.http.get<Type[]>(this.baseUrl + 'Types');
    }

    getColor() {
        return this.http.get<Color[]>(this.baseUrl + 'Colors');
    }

    getDisplacement() {
        return this.http.get<Displacement[]>(this.baseUrl + 'Displacements');
    }

    addBrand(newBrandName: string) {
        const params = new HttpParams().set('name', newBrandName);
        return this.http.post(this.baseUrl + 'Brands', null, { params });
    }

    addModel(newModelName: string, brandId: string) {
        const params = new HttpParams().set('name', newModelName).set('brandId', brandId);
        return this.http.post(this.baseUrl + 'Models', null, { params });
    }

    addType(newTypeName: string) {
        const params = new HttpParams().set('name', newTypeName);
        return this.http.post(this.baseUrl + 'Types', null, { params });
    }

    addDisplacement(newDisplacementValue: string) {
        const params = new HttpParams().set('value', newDisplacementValue);
        return this.http.post(this.baseUrl + 'Displacements', null, { params });
    }

    addColor(newColorName: string) {
        const params = new HttpParams().set('name', newColorName);
        return this.http.post(this.baseUrl + 'Colors', null, { params });
    }
      

    addVehicle(newVehicle: CreateVehicle) {
        const actionVehicleDto = {
                        description: newVehicle.description,
            brandId: newVehicle.brand,
            modelId: newVehicle.model,
            colorId: newVehicle.color,
            typeId: newVehicle.type,
            displacementId: newVehicle.displacement,
            price: newVehicle.prices
        };
        return this.http.post(this.baseUrl + 'Vehicles', actionVehicleDto);
    }
    
}