import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from '../../../core/auth/services/keycloak.service';
import { Router } from '@angular/router';
import { Vehicle } from '../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { StatisticsService } from '../services/statistics.service';


@Component({
  selector: 'app-carcard',
  templateUrl: './carcard.component.html',
  styleUrl: './carcard.component.css',
})
export class CarcardComponent {
  @Input() vehicle: any;
  @Input() tabType: 'my' | 'favorite' = 'my';
  @Output() vehicleDeleted = new EventEmitter<string>();
  @Output() vehicleRemovedFromFavorites = new EventEmitter<string>();

  showDeleteModal = false;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
    private router: Router,
    private statisticsService: StatisticsService
  ) {}

  handleCardClick(vehicle: Vehicle) {
    this.router.navigate(['/profile', vehicle.id]);
  }

  handleUpdateClick(vehicle: Vehicle, event: Event) {
    event.stopPropagation(); 
    this.router.navigate(['/profile', vehicle.id, 'edit']);
  }

  openDeleteModal(event: Event): void {
     event.stopPropagation(); 
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    this.deleteVehicle();
    this.showDeleteModal = false;
  }

  deleteVehicle(): void {
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .delete(`https://localhost:5001/api/vehicles/${this.vehicle.id}`, {
        headers,
      })
      .subscribe({
        next: () => {
          this.vehicleDeleted.emit(this.vehicle.id);
          console.log('Vehicle deleted successfully');
        },
        error: (err) => {
          console.error('Failed to delete vehicle', err);
        },
      });
  }

  removeFromFavorites(event?: Event): void {
    if (event) {
      event.stopPropagation(); 
    }
    
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post(`https://localhost:5001/api/vehicles/${this.vehicle.id}/remove-from-wishlist`, {}, {
        headers,
      })
      .subscribe({
        next: () => {
          this.vehicleRemovedFromFavorites.emit(this.vehicle.id);
          console.log('Vehicle removed from favorites successfully');
        },
        error: (err) => {
          console.error('Failed to remove vehicle from favorites', err);
        },
      });
  }
}