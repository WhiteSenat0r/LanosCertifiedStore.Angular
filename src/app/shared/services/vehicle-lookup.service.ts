import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Brand } from '../models/interfaces/vehicle-properties/Brand.interface';
import { VType } from '../models/interfaces/vehicle-properties/VType.interface';
import { DrivetrainType } from '../models/interfaces/vehicle-properties/DrivetrainType.interface';
import { EngineType } from '../models/interfaces/vehicle-properties/EngineType.interface';
import { VehicleColor } from '../models/interfaces/vehicle-properties/VehicleColor.interface';
import { Model } from '../models/interfaces/vehicle-properties/Model.interface';
import { TransmissionType } from '../models/interfaces/vehicle-properties/TransmissionType.interface';
import { BodyType } from '../models/interfaces/vehicle-properties/BodyType.interface';
import { ApiResponse } from '../models/interfaces/api/ApiResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleLookupService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getBrands() {
    return this.http.get<ApiResponse<Brand>>(this.baseUrl + 'brands');
  }
  getModels(brandId: string) {
    const params = new HttpParams()
      .set('VehicleBrandId', brandId)
      .set('PageIndex', 1)
      .set('ItemQuantity', 100);
    return this.http.get<ApiResponse<Model>>(this.baseUrl + 'models', {
      params,
    });
  }
  getVTypes() {
    return this.http.get<ApiResponse<VType>>(this.baseUrl + 'types');
  }
  getDrivetrainTypes() {
    return this.http.get<ApiResponse<DrivetrainType>>(
      this.baseUrl + 'drivetrain-types'
    );
  }
  getEngineTypes() {
    return this.http.get<ApiResponse<EngineType>>(
      this.baseUrl + 'engine-types'
    );
  }
  getColors() {
    return this.http.get<ApiResponse<VehicleColor>>(this.baseUrl + 'colors');
  }
  getTransmissionTypes() {
    return this.http.get<ApiResponse<TransmissionType>>(
      this.baseUrl + 'transmission-types'
    );
  }
  getBodyTypes() {
    return this.http.get<ApiResponse<BodyType>>(this.baseUrl + 'body-types');
  }
  getAvailableYearsMock(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 1980;
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
    );
  }
}
