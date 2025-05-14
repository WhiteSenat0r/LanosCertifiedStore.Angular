import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate.host';
  private http = inject(HttpClient);

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    const url = `${this.apiUrl}/convert?from=${from}&to=${to}&amount=${amount}`;
    return this.http.get<any>(url);
  }
}
