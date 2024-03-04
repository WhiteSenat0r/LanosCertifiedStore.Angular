import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Type } from 'src/app/shared/models/type';
import { Brand } from 'src/app/shared/models/brand';
import { Pagination } from 'src/app/shared/models/pagination';
import { ListVehicle } from 'src/app/shared/models/ListVehicle';

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
    params = params.append('selectionProfile', 2);
    return this.http.get<Pagination<ListVehicle[]>>(this.baseUrl + 'Vehicles',{params});
  }
}
