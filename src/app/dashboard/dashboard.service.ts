import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { Color } from '../shared/models/color';
import { Model } from "../shared/models/model";
import { CreateVehicle } from "../shared/models/createvehicle";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    private baseUrl = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    getModel() {
        return this.http.get<Model[]>(this.baseUrl + 'Models');
    }

    getBrands() {
        return this.http.get<Brand[]>(this.baseUrl + 'Brands');
    }

    addBrand(newBrandName: string) {
        const params = new HttpParams().set('name', newBrandName);
        return this.http.post(this.baseUrl + 'Brands', null, { params });
    }

    deleteBrand(brandId: string) {
        return this.http.delete(`${this.baseUrl}Brands/${brandId}`);
    }
    
    getTypes() {
        return this.http.get<Type[]>(this.baseUrl + 'Types');
    }

    getColor() {
        return this.http.get<Color[]>(this.baseUrl + 'Colors');
    }

    addColor(newColorName: string) {
        const params = new HttpParams().set('name', newColorName);
        return this.http.post(this.baseUrl + 'Colors', null, { params });
    }
      
    deleteColor(colorId: string) {
        return this.http.delete(`${this.baseUrl}Colors/${colorId}`);
    }

    addType(newTypeName: string) {
        const params = new HttpParams().set('name', newTypeName);
        return this.http.post(this.baseUrl + 'Types', null, { params });
    }

   
    deleteType(typeId: string) {
        return this.http.delete(`${this.baseUrl}Types/${typeId}`);
    }

    updateType(typeId: string, updatedName: string) {
        const params = new HttpParams().set('name', updatedName);
        return this.http.put(`${this.baseUrl}Types/${typeId}`, null, { params });
    }
}