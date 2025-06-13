import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from '../../../core/auth/services/keycloak.service';

@Component({
  selector: 'app-carcard',
  templateUrl: './carcard.component.html',
  styleUrl: './carcard.component.css'
})
export class CarcardComponent {
  @Input() vehicle: any;
  @Input() tabType: 'my' | 'favorite' = 'my';
  @Output() vehicleDeleted = new EventEmitter<string>();
  
  showDeleteModal = false;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService // Замініть на ваш актуальний сервіс
  ) {}

  // Відкриття модалки
  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  // Закриття модалки
  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  // Підтвердження видалення
  confirmDelete(): void {
    this.deleteVehicle();
    this.showDeleteModal = false;
  }

  // Метод видалення через API
  deleteVehicle(): void {
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.delete(`https://localhost:5001/api/vehicles/${this.vehicle.id}`, { headers })
      .subscribe({
        next: () => {
          this.vehicleDeleted.emit(this.vehicle.id);
          console.log('Vehicle deleted successfully');
        },
        error: (err) => {
          console.error('Failed to delete vehicle', err);
        }
      });
  }

  // Метод для видалення з обраного
  removeFromFavorites(): void {
    // логіка видалення з обраного через API
  }
}