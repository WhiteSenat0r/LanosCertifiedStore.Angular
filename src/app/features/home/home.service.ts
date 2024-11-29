import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../../shared/models/BaseApiModels/Vehicle';
import { BodyType } from '../../shared/models/BaseApiModels/BodyType';
import { EngineType } from '../../shared/models/BaseApiModels/EngineType';
import { PriceRange } from './models/PriceRange';
import { LocationRegion } from '../../shared/models/BaseApiModels/LocationRegion';
import { Brand } from '../../shared/models/BaseApiModels/Brand';
import { Model } from '../../shared/models/BaseApiModels/Model';
import { TransmissionType } from '../../shared/models/BaseApiModels/TransmissionType';
import { ApiResponse } from '../../shared/models/ApiSpecificModels/ApiResponse';
import { DropdownElementData } from './models/DropdownElementData.enum';

@Injectable({
  providedIn: 'root',
})
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

    if (vehicleCount) params = params.append('ItemQuantity', vehicleCount);
    if (bodyTypeId) params = params.append('BodyTypeId', bodyTypeId);
    if (LowerPriceLimit)
      params = params.append('LowerPriceLimit', LowerPriceLimit);
    params = params.append('selectionProfile', 2);
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
    ApiResponse<Brand | Model | LocationRegion | TransmissionType | EngineType>
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
        //potentially could be used just return of(undefined);
        throw new Error();
    }
  }
}
