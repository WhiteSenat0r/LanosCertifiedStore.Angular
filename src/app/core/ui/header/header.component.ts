import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
  signal,
  computed,
  effect,
  Inject,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SearchVehicle } from '../../../shared/models/SearchModels/search-vehicle';
import {
  VehicleSearchService,
  SearchResponse,
} from '../../vehicle-search.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { UserProfile } from '../../../core/auth/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { VehicleLookupService } from '../../../shared/services/vehicle-lookup.service';
import { Brand } from '../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { ApiResponse } from '../../../shared/models/interfaces/api/ApiResponse.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  //Addons
  readonly vehicleLookup = inject(VehicleLookupService);
  popularBrands = signal<Brand[] | undefined>(undefined);
  userProfileComputed = computed(() => {
    return this.authService.userProfileSignal();
  });

  handlePopularBrandClick(brand: Brand) {
    this.router.navigate(['/catalog'], {
      queryParams: { brandId: brand.id },
    });
  }

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

  @ViewChild('headerModalAside')
  headerModalAside!: ElementRef<HTMLDivElement>;
  @ViewChild('exitHeaderModalButton')
  exitHeaderModalButton!: ElementRef<HTMLDivElement>;
  @ViewChild('addProductButton')
  addProductButton!: ElementRef<HTMLDivElement>;

  @ViewChild('moreButtonRef')
  moreButtonRef!: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
    private searchService: VehicleSearchService,
    private authService: AuthService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.searchControl.valueChanges
      .pipe(
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
      )
      .subscribe({
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
        },
      });
    //Modal related
    effect(() => {
      const html = this.document.documentElement;

      if (this.showModal()) {
        html.classList.add('modal-open');
      } else {
        html.classList.remove('modal-open');
      }
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.handleAuthCallback();

    this.vehicleLookup.getBrands().subscribe((response: ApiResponse<Brand>) => {
      this.popularBrands.set(response.items.slice(0, 10));
    });
  }

 private handleAuthCallback(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');

  if (code && state) {
    this.authService.handleAuthCallback(code, state).subscribe({
      next: (success) => {
        if (success) {
          const returnUrl = localStorage.getItem('returnUrl') || '/';
          localStorage.removeItem('returnUrl');

          // Парсимо returnUrl, щоб коректно відновити шлях і queryParams
          const url = new URL(returnUrl, window.location.origin);
          const path = url.pathname;
          const queryParams: any = {};
          url.searchParams.forEach((value, key) => {
            queryParams[key] = value;
          });

          this.router.navigate([path], { queryParams, replaceUrl: true });
        }
      },
      error: (error) => {
        console.error('Error handling auth callback:', error);
      },
    });
  }
}

  handleGoToProfilePage() {
    this.showUserMenu = false;
    this.router.navigateByUrl('/profile');
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (this.user) {
      this.showUserMenu = !this.showUserMenu;
    } else {
      this.login();
    }
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
  }

  loadMoreResults(): void {
    if (this.showingAll) return;

    this.showingAll = true;
    this.searchResults = this.allSearchResults;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (
      this.searchContainer &&
      !this.searchContainer.nativeElement.contains(event.target)
    ) {
      this.showResults = false;
    }

    if (this.userMenu && !this.userMenu.nativeElement.contains(event.target)) {
      this.showUserMenu = false;
    }

    // Modal
    if (this.showModal() === true) {
      const clickedElement = event.target as HTMLElement;
      const modalElement = this.headerModalAside?.nativeElement;
      const exitElement = this.exitHeaderModalButton?.nativeElement;
      const moreButtonElement = this.moreButtonRef?.nativeElement;

      const isClickOutsideModal =
        modalElement && !modalElement.contains(clickedElement);
      const isClickOnExitModalButton =
        exitElement && exitElement.contains(clickedElement);
      const isClickOutsideMoreButton =
        !moreButtonElement.contains(clickedElement);
      if (
        isClickOnExitModalButton ||
        (isClickOutsideModal && isClickOutsideMoreButton)
      ) {
        this.showModal.set(false);
      }
    }
  }

  navigateToVehicle(vehicleId: string): void {
    const currentUrl = this.router.url;
    this.router.navigate(['/catalog', vehicleId]);
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

  // Modal Related
  showModal = signal(false);

  showHeaderModalClick() {
    this.showModal.update((value) => !value);
  }
}
