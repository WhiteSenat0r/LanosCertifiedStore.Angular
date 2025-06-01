import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SearchVehicle } from '../../../shared/models/SearchModels/search-vehicle';
import { VehicleSearchService, SearchResponse } from '../../vehicle-search.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { UserProfile } from '../../../core/auth/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');
  searchResults: SearchVehicle[] = [];
  allSearchResults: SearchVehicle[] = [];
  isLoading = false;
  showResults = false;
  showingAll = false;
  user: UserProfile | null = null;
  showUserMenu = false;
  
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('userMenu') userMenu!: ElementRef;
  
  constructor(
    private router: Router,
    private searchService: VehicleSearchService,
    private authService: AuthService
  ) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      filter((term: string | null) => !!term && term.length >= 2), 
      tap(() => {
        this.isLoading = true;
        this.showResults = true;
        this.showingAll = false;
      }),
      switchMap((term: string | null): Observable<SearchResponse> => {
        if (term) {
          return this.searchService.searchVehicles(term, 1, 10);
        }
        return of({ items: [], currentPageItemsQuantity: 0, pageIndex: 1 });
      })
    ).subscribe({
      next: (response: SearchResponse) => {
        this.allSearchResults = response.items || [];
        this.searchResults = this.allSearchResults.slice(0, 3);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.isLoading = false;
        this.searchResults = [];
        this.allSearchResults = [];
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to user changes
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    
    // Check for authentication callback
    this.handleAuthCallback();
  }

  /**
   * Handle authentication callback from Keycloak
   */
  private handleAuthCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      // Process the authentication callback
      this.authService.handleAuthCallback(code, state).subscribe({
        next: (success) => {
          if (success) {
            // Clear URL parameters
            const returnUrl = localStorage.getItem('returnUrl') || '/';
            localStorage.removeItem('returnUrl');
            
            // Remove the code and state from the URL
            this.router.navigate([returnUrl], { replaceUrl: true });
          }
        },
        error: (error) => {
          console.error('Error handling auth callback:', error);
        }
      });
    }
  }

  /**
   * Toggle user menu
   */
toggleUserMenu(event: MouseEvent): void {
  event.stopPropagation(); // щоб клік по іконці не закривав меню через HostListener
  if (this.user) {
    this.showUserMenu = !this.showUserMenu;
  } else {
    this.login();
  }
}


  /**
   * Login
   */
  login(): void {
    this.authService.login();
  }

  /**
   * Logout
   */
  logout(): void {
    this.authService.logout();
  }

  loadMoreResults(): void {
    if (this.showingAll) return;
    
    this.showingAll = true;
    this.searchResults = this.allSearchResults;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    // Close search results if click outside search container
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.showResults = false;
    }
    
    // Close user menu if click outside menu
    if (this.userMenu && !this.userMenu.nativeElement.contains(event.target)) {
      this.showUserMenu = false;
    }
  }

  navigateToVehicle(vehicleId: string): void {
    this.router.navigate(['/vehicle', vehicleId]);
    this.showResults = false;
    this.searchControl.setValue('', { emitEvent: false }); 
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.showResults = false;
    this.searchResults = [];
    this.allSearchResults = [];
    this.showingAll = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.showResults = false;
      this.showUserMenu = false;
    }
  }
}