import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from '../../shared/models/model';
import { Brand } from '../../shared/models/brand';
import { Type } from '../../shared/models/type';
import { Color } from '../../shared/models/color';
import { CreateVehicle } from '../../shared/models/createvehicle';
import { environment } from 'src/environments/environments';
import { Vehicle } from '../../shared/models/vehicle';
import { Pagination } from 'src/app/shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class VehicleoperateService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicle(id: string) {
    return this.http.get<Vehicle>(this.baseUrl + 'Vehicles' + '/' + id);
  }

  getModels() {
    return this.http.get<Pagination<Model>>(
      this.baseUrl + 'Models?selectionProfile=1'
    );
  }

  getBrands() {
    return this.http.get<Pagination<Brand>>(this.baseUrl + 'Brands');
  }

  getTypes() {
    return this.http.get<Pagination<Type>>(this.baseUrl + 'Types');
  }

  getColors() {
    return this.http.get<Pagination<Color>>(this.baseUrl + 'Colors');
  }

  addVehicle(newVehicle: CreateVehicle) {
    const actionVehicleDto = {
      modelId: newVehicle.model,
      typeId: newVehicle.type,
      colorId: newVehicle.color,
      description: newVehicle.description,
      displacement: newVehicle.displacement,
      price: newVehicle.prices,
    };
    return this.http.post<string>(this.baseUrl + 'Vehicles', actionVehicleDto);
  }
}
