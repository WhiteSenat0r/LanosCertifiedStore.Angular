import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { Color } from '../shared/models/color';
import { Model } from "../shared/models/model";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    private baseUrl = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    getModel() {
        return this.http.get<Model[]>(this.baseUrl + 'Models');
    }

    addModel(newModelName: string, brandId: string) {
        const params = new HttpParams().set('name', newModelName).set('brandId', brandId);
        return this.http.post(this.baseUrl + 'Models', null, { params });
    }

    deleteModel(modelId: string) {
        return this.http.delete(`${this.baseUrl}Models/${modelId}`);
    }

    updateModel(id: string, updatedName: string) {
        const body = { id: id, updatedName: updatedName };
        return this.http.put<Model>(`${this.baseUrl}Models`, body);
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

    updateBrand(id: string, updatedName: string) {
        const body = { id: id, updatedName: updatedName };
        return this.http.put<Brand>(`${this.baseUrl}Brands`, body);
    }

    getColor() {
        return this.http.get<Color[]>(this.baseUrl + 'Colors');
    }

    addColor(newColorName: string, newHexValue: string) {
        const body = { ColorName: newColorName, HexValue: newHexValue };
        return this.http.post<Color>(`${this.baseUrl}Colors`, body);
    }

    updateColor(id: string, updatedName: string, hexValue: string) {
        const body = { id: id, updatedName: updatedName, hexValue: hexValue };
        return this.http.put<Color>(`${this.baseUrl}Colors`, body);
    }

    deleteColor(colorId: string) {
        return this.http.delete(`${this.baseUrl}Colors/${colorId}`);
    }

    getTypes() {
        return this.http.get<Type[]>(this.baseUrl + 'Types');
    }
    
    addType(newTypeName: string) {
        const params = new HttpParams().set('name', newTypeName);
        return this.http.post(this.baseUrl + 'Types', null, { params });
    }


    deleteType(typeId: string) {
        return this.http.delete(`${this.baseUrl}Types/${typeId}`);
    }

    updateType(id: string, updatedName: string) {
        const body = { id: id, updatedName: updatedName };
        return this.http.put<Type>(`${this.baseUrl}Types`, body);
    }

}