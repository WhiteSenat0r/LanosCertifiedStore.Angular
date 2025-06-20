import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeycloakService } from '../../../core/auth/services/keycloak.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, OnDestroy {
  userProfile: any;
  isProfileModalOpen = false;
  profileForm = {
    firstName: '',
    lastName: '',
    phone: '',
    profilePhoto: null as File | null
  };

  activeListingsCount = 0;
  totalViewsCount = 0;
  wishlistCount = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit() {
    if (!this.keycloakService.isAuthenticated()) {
      this.keycloakService.login();
    } else {
      this.loadUserProfile();
    }

    // Підписуємося на оновлення статистики
    this.subscriptions.push(
      this.statisticsService.wishlistUpdated$.subscribe(() => {
        if (this.userProfile?.id) {
          this.loadWishlistCount(this.userProfile.id);
        }
      })
    );

    this.subscriptions.push(
      this.statisticsService.vehicleDeleted$.subscribe(() => {
        if (this.userProfile?.id) {
          this.loadActiveListingsCount(this.userProfile.id);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadUserProfile() {
    const token = this.keycloakService.getAccessToken();

    if (!token) {
      console.error('No access token found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get('https://localhost:5001/api/identity/me', { headers })
      .subscribe({
        next: (profile: any) => {
          this.userProfile = profile;
          this.loadUserStatistics(profile.id);
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      });
  }

  loadUserStatistics(ownerId: string) {
    this.loadActiveListingsCount(ownerId);
    this.loadWishlistCount(ownerId);
    this.totalViewsCount = 0;
  }

  private loadActiveListingsCount(ownerId: string) {
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(`https://localhost:5001/api/vehicles/count?OwnerId=${ownerId}`, { headers })
      .subscribe({
        next: (response: any) => {
          this.activeListingsCount = response.filteredItemsCount || 0;
        },
        error: (err) => {
          console.error('Failed to load active listings count', err);
          this.activeListingsCount = 0;
        }
      });
  }

  private loadWishlistCount(ownerId: string) {
    const token = this.keycloakService.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(`https://localhost:5001/api/user/wishlist/count?UserId=${ownerId}`, { headers })
      .subscribe({
        next: (response: any) => {
          this.wishlistCount = response.totalItemsCount || response.count || 0;
        },
        error: (err) => {
          console.error('Failed to load wishlist count', err);
          this.wishlistCount = 0;
        }
      });
  }

  openProfileModal() {
    if (this.userProfile) {
      this.profileForm = {
        firstName: this.userProfile.firstName || '',
        lastName: this.userProfile.lastName || '',
        phone: this.userProfile.phoneNumber || '',
        profilePhoto: null
      };
    }
    this.isProfileModalOpen = true;
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
  }

  onSubmit() {
    const token = this.keycloakService.getAccessToken();
    if (!token) {
      console.error('No access token found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const profileData = {
      phoneNumber: this.profileForm.phone,
      firstName: this.profileForm.firstName,
      lastName: this.profileForm.lastName
    };

    const apiUrl = `https://localhost:5001/api/identity`;

    this.http.put(apiUrl, profileData, { headers })
      .subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
          this.loadUserProfile();
          this.closeProfileModal();
        },
        error: (err) => {
          console.error('Failed to update profile', err);
        }
      });
  }

  onCancel() {
    this.closeProfileModal();
  }
}