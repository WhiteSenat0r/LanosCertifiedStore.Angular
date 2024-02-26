import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Vehicle } from '../shared/models/vehicle';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { CatalogParams } from '../shared/models/catalogParams';
import { Color } from '../shared/models/color';
import { Model } from '../shared/models/model';
import { ListVehicle } from '../shared/models/ListVehicle';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}


  formatDate(date: Date) {
    const year = date.getFullYear(); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2); 
    return year + '-' + month + '-' + day;
  }

  getVehicles(catalogParams: CatalogParams)
  {
    let params = new HttpParams();

    if(catalogParams.typeName != '') params = params.append('Type', catalogParams.typeName)
    if(catalogParams.brandName != '') params = params.append('Brand', catalogParams.brandName)
    if(catalogParams.modelName != '') params = params.append('Model', catalogParams.modelName)
    if(catalogParams.colorName != '') params = params.append('Color', catalogParams.colorName)
    if(catalogParams.sort != '') params = params.append('SortingType', catalogParams.sort)
    
    if(catalogParams.minimalPriceDate)
    {
        params = params.append('MinimalPriceDate', this.formatDate(catalogParams.minimalPriceDate));
        params = params.append('LowerPriceLimit', catalogParams.lowerPriceLimit);
        params = params.append('UpperPriceLimit', catalogParams.upperPriceLimit); 
    }


    //pagination
    params = params.append('pageIndex', catalogParams.pageNumber);

    params = params.append('ItemQuantity', catalogParams.pageSize);

    return this.http.get<Pagination<ListVehicle[]>>(this.baseUrl + 'Vehicles',{params})
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
    return this.http.get<Model[]>(this.baseUrl + 'Models');
  }

  getColors(){
    return this.http.get<Color[]>(this.baseUrl + 'Colors');
  }
}
