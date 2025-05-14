import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ExtendedVehicle } from '../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';
import { Vehicle } from '../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { PaginatedResult } from '../../../shared/models/interfaces/api/PaginatedResult.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getVehicle(id: string): Observable<ExtendedVehicle> {
    return this.http.get<ExtendedVehicle>(
      this.baseUrl + 'vehicles/' + id
    );
  }

  getVehicles(TransmissionType: string): Observable<PaginatedResult<Vehicle>>
  {
     const params = new HttpParams().set('TransmissionType', TransmissionType);

     return this.http.get<PaginatedResult<Vehicle>>(this.baseUrl + 'vehicles', { params })
  }
}
