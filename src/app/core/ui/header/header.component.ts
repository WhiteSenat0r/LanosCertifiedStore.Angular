import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SearchVehicle } from '../../../shared/models/SearchModels/search-vehicle';
import { VehicleSearchService, SearchResponse } from '../../vehicle-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchControl = new FormControl('');
  searchResults: SearchVehicle[] = [];
  allSearchResults: SearchVehicle[] = [];
  isLoading = false;
  showResults = false;
  showingAll = false;
  
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  
  constructor(
    private router: Router,
    private searchService: VehicleSearchService
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
          console.log('Searching for:', term);
          return this.searchService.searchVehicles(term, 1, 10);
        }
        return of({ items: [], currentPageItemsQuantity: 0, pageIndex: 1 });
      })
    ).subscribe({
      next: (response: SearchResponse) => {
        console.log('Search response:', response);
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

  loadMoreResults(): void {
    if (this.showingAll) return;
    
    this.showingAll = true;
    this.searchResults = this.allSearchResults;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.showResults = false;
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
    }
  }
}