import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Vehicle } from '../shared/models/vehicle';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getVehicles()
  {
    return this.http.get<Vehicle[]>(this.baseUrl + 'Vehicles');
  }

  getVehicle(id: string){ 
    return this.http.get<Vehicle>(this.baseUrl + 'Vehicles' + '/' + id);
  }

  getTypes(){ 
    return this.http.get<Type[]>(this.baseUrl + 'Types');
  }

  getBrands(){ 
    return this.http.get<Brand[]>(this.baseUrl + 'Brands');
  }
}
