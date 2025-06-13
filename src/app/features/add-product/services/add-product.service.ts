import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AdPostPayload } from '../models/interfaces/AdPostPayload.interface';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  postAd(payload: AdPostPayload)
  {
    return this.http.post<any>(this.baseUrl + 'vehicles', payload);
  }
}
