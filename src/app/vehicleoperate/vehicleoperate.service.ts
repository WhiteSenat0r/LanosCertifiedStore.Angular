import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from '../shared/models/model';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { Color } from '../shared/models/color';
import { CreateVehicle } from '../shared/models/createvehicle';
import { environment } from 'src/environments/environments';
import { Vehicle } from '../shared/models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleoperateService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVehicle(id: string){ 
    return this.http.get<Vehicle>(this.baseUrl + 'Vehicles' + '/' + id);
  }

  getModel() {
      return this.http.get<Model[]>(this.baseUrl + 'Models?selectionProfile=1');
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
  

  addVehicle(newVehicle: CreateVehicle) {
      const actionVehicleDto = {
          description: newVehicle.description,
          brandId: newVehicle.brand,
          modelId: newVehicle.model,
          colorId: newVehicle.color,
          typeId: newVehicle.type,
          displacement: newVehicle.displacement,
          price: newVehicle.prices
      };
      return this.http.post(this.baseUrl + 'Vehicles', actionVehicleDto);
  }
  
}
