import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { Color } from '../shared/models/color';
import { Model } from "../shared/models/model";
import { Displacement } from "../shared/models/displacement";

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

}