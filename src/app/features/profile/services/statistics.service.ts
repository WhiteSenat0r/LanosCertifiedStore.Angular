import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private wishlistUpdatedSource = new Subject<void>();
  private vehicleDeletedSource = new Subject<void>();

  wishlistUpdated$ = this.wishlistUpdatedSource.asObservable();
  vehicleDeleted$ = this.vehicleDeletedSource.asObservable();

  notifyWishlistUpdated(): void {
    this.wishlistUpdatedSource.next();
  }

  notifyVehicleDeleted(): void {
    this.vehicleDeletedSource.next();
  }
}