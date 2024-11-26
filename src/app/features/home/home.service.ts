import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../../shared/models/ApiModels/Vehicle';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBodyTypes(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'BodyTypes');
  }

  getVehicles(vehicleCount?: number): Observable<{ items: Vehicle[] }> {
    let params = new HttpParams();

    if (vehicleCount) params = params.append('ItemQuantity', vehicleCount);
    params = params.append('selectionProfile', 2);
    // return this.http.get<any>(this.baseUrl + 'Vehicles',{params});
    return this.http.get<{ items: Vehicle[] }>(this.baseUrl + 'vehicles');
  }


  getBrands(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Brands' + '?ItemQuantity=100');
  }
}
