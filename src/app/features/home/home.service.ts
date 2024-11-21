import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../../shared/models/ApiModels/Vehicle';
import { BodyType } from '../../shared/models/ApiModels/BodyType';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBodyTypes(): Observable<{items: BodyType[] }> {
    return this.http.get<{items: BodyType[] }>(this.baseUrl + 'body-types');
  }

  getVehicles(vehicleCount?: number, bodyTypeId?: string, LowerPriceLimit?: number): Observable<{ items: Vehicle[] }> {
    let params = new HttpParams();

    if (vehicleCount) params = params.append('ItemQuantity', vehicleCount);
    if (bodyTypeId) params = params.append('BodyTypeId', bodyTypeId);
    if (LowerPriceLimit) params = params.append('LowerPriceLimit', LowerPriceLimit);
    params = params.append('selectionProfile', 2);
    // return this.http.get<any>(this.baseUrl + 'Vehicles',{params});
    return this.http.get<{ items: Vehicle[] }>(this.baseUrl + 'vehicles', { params });
  }

  getBrands(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Brands' + '?ItemQuantity=100');
  }
}
