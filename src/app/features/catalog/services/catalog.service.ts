import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { VehicleSearchCriterias } from '../models/classes/VehicleSearchCriterias.class';
import { Observable } from 'rxjs';
import { Vehicle } from '../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { PaginatedResult } from '../../../shared/models/interfaces/api/PaginatedResult.interface';
import { VehicleCountSummary } from '../models/interfaces/VehicleCountSummary.interface';
import { VehicleColor } from '../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { PriceRange } from '../../home/models/interfaces/PriceRange.interface';
import { Brand } from '../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { ApiResponse } from '../../../shared/models/interfaces/api/ApiResponse.interface';

//not the best approach in case of a 'solititude'
//feature to pass an object with property provicedIn which is 'root'
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicles(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): Observable<PaginatedResult<Vehicle>> {
    const params = this.buildVehicleParams(vehicleSearchCriterias);

    return this.http.get<PaginatedResult<Vehicle>>(this.baseUrl + 'vehicles', {
      params,
    });
  }

  getVehicleCountSummary(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): Observable<VehicleCountSummary> {
    return this.http.get<VehicleCountSummary>(this.baseUrl + 'vehicles/count');
  }

  getVehicleColors(): Observable<PaginatedResult<VehicleColor>> {
    return this.http.get<PaginatedResult<VehicleColor>>(
      this.baseUrl + 'colors'
    );
  }

  getBrands(): Observable<ApiResponse<Brand>> {
    return this.http.get<ApiResponse<Brand>>(this.baseUrl + 'brands');
  }

  getModels(brandId: string): Observable<ApiResponse<Model>> {
    const params = new HttpParams()
      .set('VehicleBrandId', brandId)
      .set('PageIndex', 1)
      .set('ItemQuantity', 100);
    return this.http.get<ApiResponse<Model>>(this.baseUrl + 'models', {
      params,
    });
  }

  getPriceRanges(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): Observable<PriceRange> {
    const params = this.buildVehicleParams(vehicleSearchCriterias);
    return this.http.get<PriceRange>(this.baseUrl + 'vehicles/price-range', {
      params,
    });
  }

  private buildVehicleParams(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): HttpParams {
    let params = new HttpParams();

    if (!vehicleSearchCriterias) return params;

    if (vehicleSearchCriterias) {
      if (vehicleSearchCriterias.year) {
        params = params.set('ProductionYear', vehicleSearchCriterias.year);
      }
      if (vehicleSearchCriterias.pageIndex !== 1) {
        params = params.set('PageIndex', vehicleSearchCriterias.pageIndex);
      }
      if (vehicleSearchCriterias.colorId) {
        params = params.set('ColorId', vehicleSearchCriterias.colorId);
      }
      if (vehicleSearchCriterias.lowerPriceLimit) {
        params = params.set(
          'LowerPriceLimit',
          vehicleSearchCriterias.lowerPriceLimit
        );
      }
      if (vehicleSearchCriterias.upperPriceLimit) {
        params = params.set(
          'UpperPriceLimit',
          vehicleSearchCriterias.upperPriceLimit
        );
      }
      if (vehicleSearchCriterias.brandId) {
        params = params.set('BrandId', vehicleSearchCriterias.brandId);
      }
      if (vehicleSearchCriterias.modelId) {
        params = params.set('ModelId', vehicleSearchCriterias.modelId);
      }
    }
    return params;
  }
}
