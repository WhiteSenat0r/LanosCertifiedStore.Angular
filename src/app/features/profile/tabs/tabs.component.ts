import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../../core/auth/services/keycloak.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface Vehicle {
  id: string;
  mileage: number;
  displacement: number;
  price: number;
  mainImageUrl: string;
  fullName: string;
  locationTownName: string;
  engineType: string;
  bodyType: string;
  isPresentInWishlist: boolean;
}

interface VehiclesResponse {
  items: Vehicle[];
  currentPageItemsQuantity: number;
  pageIndex: number;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit {
  selectedTab: 'myOffers' | 'favorites' = 'myOffers';
  vehicles: Vehicle[] = [];
  displayedVehicles: Vehicle[] = [];
  userProfile: any;

  pageSize = 3;
  currentPage = 1;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
    if (this.keycloakService.isAuthenticated()) {
      this.loadUserProfile();
    } else {
      this.keycloakService.login();
    }
  }

  loadUserProfile(): void {
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get('https://localhost:5001/api/identity/me', { headers })
      .subscribe({
        next: (profile: any) => {
          this.userProfile = profile;
          this.loadVehiclesByOwner(profile.id);
        },
        error: (err) => {
          console.error('Failed to load profile', err);
        }
      });
  }

  loadVehiclesByOwner(ownerId: string): void {
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<VehiclesResponse>(`https://localhost:5001/api/vehicles?OwnerId=${ownerId}`, { headers })
      .subscribe({
        next: (response: VehiclesResponse) => {
          this.vehicles = response.items;
          this.resetPagination();
        },
        error: (err) => {
          console.error('Failed to load vehicles', err);
        }
      });
  }

  loadFavoriteVehicles(): void {
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<VehiclesResponse>(`https://localhost:5001/api/user/wishlist?UserId=${this.userProfile.id}`, { headers })
      .subscribe({
        next: (response: VehiclesResponse) => {
          this.vehicles = response.items;
          this.resetPagination();
        },
        error: (err) => {
          console.error('Failed to load favorite vehicles', err);
          this.vehicles = [];
          this.resetPagination();
        }
      });
  }
  onTabChange(tab: 'myOffers' | 'favorites'): void {
    this.selectedTab = tab;
    this.currentPage = 1;
    this.vehicles = [];
    this.displayedVehicles = [];

    if (tab === 'myOffers' && this.userProfile?.id) {
      this.loadVehiclesByOwner(this.userProfile.id);
    }

    if (tab === 'favorites' && this.userProfile?.id) {
      this.loadFavoriteVehicles();
    }
  }


  loadMore(): void {
    this.currentPage++;
    this.updateDisplayedVehicles();
  }

  private resetPagination(): void {
    this.currentPage = 1;
    this.updateDisplayedVehicles();
  }

  private updateDisplayedVehicles(): void {
    this.displayedVehicles = this.vehicles.slice(0, this.currentPage * this.pageSize);
  }

  onVehicleDeleted(vehicleId: string): void {
    this.displayedVehicles = this.displayedVehicles.filter(vehicle => vehicle.id !== vehicleId);
  }
}