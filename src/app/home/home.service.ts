import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { ListVehicle } from '../shared/models/ListVehicle';
import { Pagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl + 'Brands');
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl + 'Types');
  }

  getVehicles(vehicleCount?: number){
    let params = new HttpParams();

    if(vehicleCount) params = params.append('ItemQuantity', vehicleCount);
    return this.http.get<Pagination<ListVehicle[]>>(this.baseUrl + 'Vehicles',{params});
  }
}
