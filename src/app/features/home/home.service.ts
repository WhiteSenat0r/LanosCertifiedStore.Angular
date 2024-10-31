import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BodyType } from '../../shared/models/BodyType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBodyTypes(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'BodyTypes');
  }

  getVehicles(vehicleCount?: number): Observable<any> {
    let params = new HttpParams();

    if(vehicleCount) params = params.append('ItemQuantity', vehicleCount);
    params = params.append('selectionProfile', 2);
    // return this.http.get<any>(this.baseUrl + 'Vehicles',{params});
    return this.http.get<any>(this.baseUrl + 'BodyTypes');
  }
  

  getBrands(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Brands' + '?ItemQuantity=100');
  }
}
