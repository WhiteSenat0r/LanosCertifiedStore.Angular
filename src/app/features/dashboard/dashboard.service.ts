import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Type } from '../../shared/models/type';
import { Brand } from '../../shared/models/brand';
import { Color } from '../../shared/models/color';
import { Model } from "../../shared/models/model";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    private baseUrl = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    getModel() {
        return this.http.get<Model[]>(this.baseUrl + 'Models?selectionProfile=1');
    }

    addModel(newModelName: string, brandId: string, types: string[]) {
        const body = {
            name: newModelName,
            brandId: brandId,
            AvailableTypesIds: types
        };
        return this.http.post(this.baseUrl + 'Models', body);
    }

    deleteModel(modelId: string) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                id: modelId
            }
        };
        return this.http.delete(`${this.baseUrl}Models`, options);
    }

    updateModel(id: string, updatedName: string, brandId: string, types: string[]) {
        const body = {
            id: id,
            updatedName: updatedName,
            brandId: brandId,
            AvailableTypesIds: types
        };
        return this.http.put<Model>(`${this.baseUrl}Models`, body);
    }

    getBrands() {
        return this.http.get<Brand[]>(this.baseUrl + 'Brands');
    }


    addBrand(newBrandName: string) {
        const body = {
            name: newBrandName
        };
        return this.http.post(`${this.baseUrl}Brands`, body);
    }

    deleteBrand(brandId: string) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                id: brandId
            }
        };
        return this.http.delete(`${this.baseUrl}Brands`, options);
    }

    updateBrand(id: string, updatedName: string) {
        const body = {
            id: id,
            updatedName: updatedName
        };
        return this.http.put<Brand>(`${this.baseUrl}Brands`, body);
    }

    getColor() {
        return this.http.get<Color[]>(this.baseUrl + 'Colors');
    }

    addColor(newColorName: string, newHexValue: string) {
        const body = {
            ColorName: newColorName,
            HexValue: newHexValue
        };
        return this.http.post<Color>(`${this.baseUrl}Colors`, body);
    }

    updateColor(id: string, updatedName: string, hexValue: string) {
        const body = {
            id: id,
            updatedName: updatedName,
            hexValue: hexValue
        };
        return this.http.put<Color>(`${this.baseUrl}Colors`, body);
    }

    deleteColor(colorId: string) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                id: colorId
            }
        };
        return this.http.delete(`${this.baseUrl}Colors`, options);
    }

    getTypes() {
        return this.http.get<Type[]>(this.baseUrl + 'Types');
    }

    addType(newTypeName: string) {
        const body = { name: newTypeName };
        return this.http.post(`${this.baseUrl}Types`, body);
    }

    deleteType(typeId: string) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                id: typeId
            }
        };
        return this.http.delete(`${this.baseUrl}Types`, options);
    }

    updateType(id: string, updatedName: string) {
        const body = { id: id, updatedName: updatedName };
        return this.http.put<Type>(`${this.baseUrl}Types`, body);
    }
}