import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ExtendedVehicle } from '../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';
import { Vehicle } from '../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { PaginatedResult } from '../../../shared/models/interfaces/api/PaginatedResult.interface';
import { Model } from '../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { Brand } from '../../../shared/models/interfaces/vehicle-properties/Brand.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getVehicle(id: string): Observable<ExtendedVehicle> {
    return this.http.get<ExtendedVehicle>(this.baseUrl + 'vehicles/' + id);
  }

  getVehicles(TransmissionType: string): Observable<PaginatedResult<Vehicle>> {
    const params = new HttpParams().set('TransmissionType', TransmissionType);

    return this.http.get<PaginatedResult<Vehicle>>(this.baseUrl + 'vehicles', {
      params,
    });
  }

  getModels(brandName: string): Observable<PaginatedResult<Model>> {
    return this.getBrands().pipe(
      switchMap((response) => {
        const brands = response.items;
        const brand = brands.find((b) => b.name === brandName);

        if (!brand) {
          throw new Error('Brand not found');
        }

        const brandId = brand.id;
        const params = new HttpParams().set('VehicleBrandId', brandId);

        return this.http.get<PaginatedResult<Model>>(this.baseUrl + 'models', { params });
      })
    );
  }

  private getBrands() {
    return this.http.get<PaginatedResult<Brand>>(this.baseUrl + 'brands');
  }
}
