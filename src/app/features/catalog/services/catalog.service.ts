import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { VehicleSearchCriterias } from '../models/VehicleSearchCriterias';
import { Observable } from 'rxjs';
import { Vehicle } from '../../../shared/models/BaseApiModels/Vehicle';
import { PaginatedResult } from '../models/PaginatedResult';
import { VehicleCountSummary } from '../models/VehicleCountSummary';
import { VehicleColor } from '../../../shared/models/BaseApiModels/VehicleColor';
import { PriceRange } from '../../home/models/PriceRange';

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
    }
    return params;
  }
}
