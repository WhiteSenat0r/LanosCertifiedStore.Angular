import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { BodyType } from '../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { EngineType } from '../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { PriceRange } from '../models/interfaces/PriceRange.interface';
import { LocationRegion } from '../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { Brand } from '../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { TransmissionType } from '../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { DropdownElementData } from '../models/enums/DropdownElementData.enum';
import { ApiResponse } from '../../../shared/models/interfaces/api/ApiResponse.interface';

@Injectable({ providedIn: null })
export class HomeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBodyTypes(): Observable<{ items: BodyType[] }> {
    return this.http.get<{ items: BodyType[] }>(this.baseUrl + 'body-types');
  }

  getVehicles(
    vehicleCount?: number,
    bodyTypeId?: string,
    LowerPriceLimit?: number
  ): Observable<ApiResponse<Vehicle>> {
    let params = new HttpParams();

    if (vehicleCount) params = params.set('ItemQuantity', vehicleCount);
    if (bodyTypeId) params = params.set('BodyTypeIds', bodyTypeId);
    if (LowerPriceLimit)
      params = params.set('LowerPriceLimit', LowerPriceLimit);
    params = params.set('selectionProfile', 2);
    // return this.http.get<any>(this.baseUrl + 'Vehicles',{params});
    return this.http.get<{ items: Vehicle[] }>(this.baseUrl + 'vehicles', {
      params,
    });
  }

  getPriceRanges(): Observable<PriceRange> {
    return this.http.get<PriceRange>(this.baseUrl + 'vehicles/price-range');
  }

  getDropDownData(
    apiCallOption: DropdownElementData
  ): Observable<
    | ApiResponse<
        Brand | Model | LocationRegion | TransmissionType | EngineType
      >
    | undefined
  > {
    switch (apiCallOption) {
      case DropdownElementData.engine:
        return this.http.get<ApiResponse<EngineType>>(
          this.baseUrl + 'engine-types'
        );
      case DropdownElementData.brand:
        return this.http.get<ApiResponse<Brand>>(this.baseUrl + 'brands');
      case DropdownElementData.model:
        return this.http.get<ApiResponse<Model>>(this.baseUrl + 'models');
      case DropdownElementData.location:
        return this.http.get<ApiResponse<LocationRegion>>(
          this.baseUrl + 'location-regions'
        );
      case DropdownElementData.transmission:
        return this.http.get<ApiResponse<TransmissionType>>(
          this.baseUrl + 'transmission-types'
        );
      default:
        return of(undefined);
    }
  }
}
