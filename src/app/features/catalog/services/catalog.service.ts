import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { VehicleSearchCriterias } from '../models/VehicleSearchCriterias';
import { Observable } from 'rxjs';
import { Vehicle } from '../../../shared/models/BaseApiModels/Vehicle';
import { PaginatedResult } from '../models/PaginatedResult';

//not the best approach in case of a 'solititude'
//feature to pass an object with property provicedIn which is 'root'
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicles(
    vehicleSearchCriterias?: VehicleSearchCriterias
  ): Observable<PaginatedResult<Vehicle>> {
    let params = new HttpParams();

    if (vehicleSearchCriterias) {
      if (vehicleSearchCriterias.year) {
        params = params.set('ProductionYear', vehicleSearchCriterias.year);
      }
    }

    return this.http.get<PaginatedResult<Vehicle>>(this.baseUrl + 'vehicles', {
      params,
    });
  }
}
