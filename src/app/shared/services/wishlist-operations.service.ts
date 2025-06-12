import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistOperationsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  addVehicleToWishList(vehicleId: string) {
    return this.http.post<any>(
      this.baseUrl + 'vehicles/' + vehicleId + '/add-to-wishlist',
      {}
    );
  }

  deleteVehicleFromWishList(vehicleId: string) {
    return this.http.post<any>(
      this.baseUrl + 'vehicles/' + vehicleId + '/remove-from-wishlist',
      {}
    );
  }
}
