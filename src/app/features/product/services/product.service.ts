import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ExtendedVehicle } from '../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  getVehicle(id: string): Observable<ExtendedVehicle> {
    return this.httpClient.get<ExtendedVehicle>(
      this.baseUrl + 'vehicles/' + id
    );
  }
}
