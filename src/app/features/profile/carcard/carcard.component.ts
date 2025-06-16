import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from '../../../core/auth/services/keycloak.service';
import { Router } from '@angular/router';
import { Vehicle } from '../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-carcard',
  templateUrl: './carcard.component.html',
  styleUrl: './carcard.component.css',
  animations: [
    trigger('fadeOut', [
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)',
        height: '*',
        marginBottom: '16px',
        paddingTop: '*',
        paddingBottom: '*'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.95)',
        height: '0px',
        marginBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        overflow: 'hidden'
      })),
      transition('visible => hidden', [
        animate('400ms ease-out', style({
          opacity: 0,
          transform: 'scale(0.95)'
        })),
        animate('300ms ease-out', style({
          height: '0px',
          marginBottom: '0px',
          paddingTop: '0px',
          paddingBottom: '0px',
          overflow: 'hidden'
        }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class CarcardComponent {
  @Input() vehicle: any;
  @Input() tabType: 'my' | 'favorite' = 'my';
  @Output() vehicleDeleted = new EventEmitter<string>();
  @Output() vehicleRemovedFromFavorites = new EventEmitter<string>();

  private readonly toastr = inject(ToastrService);

  animationState: 'visible' | 'hidden' = 'visible';
  showDeleteModal = false;
  isRemoving = false;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.animationState = 'visible';
  }

  handleCardClick(vehicle: Vehicle) {
    if (this.isRemoving) return;
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
    if (this.isRemoving) return;

    this.isRemoving = true;
    this.animationState = 'hidden';

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
          this.toastr.success('Оголошення видалено', 'Успіх', {
            timeOut: 2000,
          });

          // Затримка для завершення анімації перед емітом події
          setTimeout(() => {
            this.vehicleDeleted.emit(this.vehicle.id);
          }, 700);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Не вдалося видалити оголошення', 'Помилка');
          this.animationState = 'visible';
          this.isRemoving = false;
        },
      });
  }

  removeFromFavorites(event?: Event): void {
    event?.stopPropagation();

    if (this.isRemoving) return;

    this.isRemoving = true;
    this.animationState = 'hidden';

    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post(
        `https://localhost:5001/api/vehicles/${this.vehicle.id}/remove-from-wishlist`,
        {},
        { headers }
      )
      .subscribe({
        next: () => {
          this.toastr.info('Прибрано з обраного', 'Готово', {
            timeOut: 2000,
          });

          // Затримка для завершення анімації перед емітом події
          setTimeout(() => {
            this.vehicleRemovedFromFavorites.emit(this.vehicle.id);
          }, 700);
        },
        error: (err) => {
          console.error('Failed to remove vehicle from favorites', err);
          this.toastr.error('Не вдалося прибрати з обраного', 'Помилка');
          this.animationState = 'visible';
          this.isRemoving = false;
        },
      });
  }
}