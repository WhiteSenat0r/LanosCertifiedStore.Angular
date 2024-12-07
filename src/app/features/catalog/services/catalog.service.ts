import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { BodyType } from '../../../shared/models/BaseApiModels/BodyType';

@Injectable()
export class CatalogService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBodyTypes(): Observable<{ items: BodyType[] }> {
    return this.http.get<{ items: BodyType[] }>(this.baseUrl + 'body-types');
  }
}
