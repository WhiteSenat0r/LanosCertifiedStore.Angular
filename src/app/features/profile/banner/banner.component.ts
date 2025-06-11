import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../../core/auth/services/keycloak.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
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

  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (!this.keycloakService.isAuthenticated()) {
      this.keycloakService.login();
    } else {
      this.loadUserProfile();
    }
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
        next: (profile:any) => {
          this.userProfile = profile;
          this.loadUserStatistics(profile.id);
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      });
  }

  loadUserStatistics(ownerId: string) {
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
          this.activeListingsCount = 0;
        }
      });

    this.totalViewsCount = 0;
  }

  openProfileModal() {
    if (this.userProfile) {
      this.profileForm = {
        firstName: this.userProfile.firstName || '',
        lastName: this.userProfile.lastName || '',
        phone: this.userProfile.phone || '',
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
