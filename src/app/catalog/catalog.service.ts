import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Vehicle } from '../shared/models/vehicle';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}


  getVehicles(typeName: string, brandName: string, modelName: string)
  {
    let params = new HttpParams();

    //if we got typeId. Just not to write excessively in url
    if(typeName != '') params = params.append('Type', typeName)
    if(brandName != '') params = params.append('Brand', brandName)
    if(modelName != '') params = params.append('Model', modelName)

    return this.http.get<Pagination<Vehicle[]>>(this.baseUrl + 'Vehicles',{params})
  }

  // getVehicles()
  // {
  //   return this.http.get<Vehicle[]>(this.baseUrl + 'Vehicles');
  // }

  getVehicle(id: string){ 
    return this.http.get<Vehicle>(this.baseUrl + 'Vehicles' + '/' + id);
  }

  getTypes(){ 
    return this.http.get<Type[]>(this.baseUrl + 'Types');
  }

  getBrands(){ 
    return this.http.get<Brand[]>(this.baseUrl + 'Brands');
  }
  
  getModels(){ 
    return this.http.get<Brand[]>(this.baseUrl + 'Models');
  }
}
