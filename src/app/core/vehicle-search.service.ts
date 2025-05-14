import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SearchVehicle } from '../shared/models/SearchModels/search-vehicle';
import { environment } from '../../../src/environments/environment';

export interface SearchResponse {
  items: SearchVehicle[];
  currentPageItemsQuantity: number;
  pageIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleSearchService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    const baseUrl = environment.apiUrl.endsWith('/') 
      ? environment.apiUrl.slice(0, -1) 
      : environment.apiUrl;
    
    this.apiUrl = `${baseUrl}/vehicles/find`;
  }

  searchVehicles(searchTerm: string, pageIndex: number = 1, itemQuantity: number = 10): Observable<SearchResponse> {
    if (!this.apiUrl) {
      console.error('API URL is not configured');
      return of({ items: [], currentPageItemsQuantity: 0, pageIndex: 1 });
    }

    let httpParams = new HttpParams()
      .set('SearchTerm', searchTerm)
      .set('pageIndex', pageIndex.toString())
      .set('ItemQuantity', itemQuantity.toString());

    console.log('Sending request to:', this.apiUrl, 'with params:', httpParams.toString());

    return this.http.get<SearchResponse>(this.apiUrl, { params: httpParams })
      .pipe(
        tap(response => console.log('Raw API response:', response)),
        catchError(error => {
          console.error('Error fetching search results:', error);
          if (error.status === 404) {
            console.warn('API endpoint not found. Check your API URL configuration.');
          } else if (error.status === 0) {
            console.warn('Network error or CORS issue. Check if API is running.');
          }
          return of({ items: [], currentPageItemsQuantity: 0, pageIndex: 1 });
        })
      );
  }
}