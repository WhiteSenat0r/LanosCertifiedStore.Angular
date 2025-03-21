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
import { EngineType } from '../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { DrivetrainType } from '../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { BodyType } from '../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { TransmissionType } from '../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VType } from '../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { LocationRegion } from '../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';

//not the best approach in case of a 'solititude'
//feature to pass an object with property provicedIn which is 'root'
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicles(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): Observable<PaginatedResult<Vehicle>> {
    let params = this.buildVehicleParams(vehicleSearchCriterias);

    params = params.set('ItemQuantity', vehicleSearchCriterias?.currentPageItemsQuantity ?? 100);

    return this.http.get<PaginatedResult<Vehicle>>(this.baseUrl + 'vehicles', {
      params,
    });
  }

  getVehicleCountSummary(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): Observable<VehicleCountSummary> {
    const params = this.buildVehicleParams(vehicleSearchCriterias);
    return this.http.get<VehicleCountSummary>(this.baseUrl + 'vehicles/count', {
      params,
    });
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

  getRegions(): Observable<ApiResponse<LocationRegion>> {
    return this.http.get<ApiResponse<LocationRegion>>(
      this.baseUrl + 'location-regions'
    );
  }

  getTowns(regionId: string): Observable<ApiResponse<LocationTown>> {
    const params = new HttpParams()
      .set('LocationRegionId', regionId)
      .set('PageIndex', 1)
      .set('ItemQuantity', 100);
    return this.http.get<ApiResponse<LocationTown>>(
      this.baseUrl + 'location-towns',
      {
        params,
      }
    );
  }

  getEngines(): Observable<ApiResponse<EngineType>> {
    return this.http.get<ApiResponse<EngineType>>(
      this.baseUrl + 'engine-types'
    );
  }

  getDrivetrains(): Observable<ApiResponse<DrivetrainType>> {
    return this.http.get<ApiResponse<DrivetrainType>>(
      this.baseUrl + 'drivetrain-types'
    );
  }
  getBodyTypes(): Observable<ApiResponse<BodyType>> {
    return this.http.get<ApiResponse<BodyType>>(this.baseUrl + 'body-types');
  }
  getTranmissionTypes(): Observable<ApiResponse<TransmissionType>> {
    return this.http.get<ApiResponse<TransmissionType>>(
      this.baseUrl + 'transmission-types'
    );
  }
  getVTypes(): Observable<ApiResponse<VType>> {
    return this.http.get<ApiResponse<VType>>(this.baseUrl + 'types');
  }

  getPriceRanges(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): Observable<PriceRange> {
    let params: HttpParams;
    if (vehicleSearchCriterias) {
      params = this.buildVehicleParams({
        ...vehicleSearchCriterias,
        lowerPriceLimit: 0, 
        upperPriceLimit: undefined,
      });
    } else {
      params = this.buildVehicleParams(undefined);
    }

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
      if (vehicleSearchCriterias.bodyTypeIds) {
        vehicleSearchCriterias.bodyTypeIds.forEach((id) => {
          params = params.set('BodyType', id);
        });
      }
      if (vehicleSearchCriterias.locationRegionId) {
        params = params.set(
          'LocationRegionAreaId',
          vehicleSearchCriterias.locationRegionId
        );
        params = params.set(
          'LocationAreaId',
          vehicleSearchCriterias.locationRegionId
        );
      }
      if (vehicleSearchCriterias.townId) {
        params = params.set('LocationTownId', vehicleSearchCriterias.townId);
      }
    }
    return params;
  }
}
