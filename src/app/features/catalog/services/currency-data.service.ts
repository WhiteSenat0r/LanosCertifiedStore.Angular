import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyDataService {
  private apiKey = '7f4c0f542e2bdf309e3d4a2807ff481a';

  constructor(private http: HttpClient) {}

  getExchangeRates() {
    const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${this.apiKey}`;
    return this.http.get(url).pipe(map((res: any) => res.rates));
  }
}
