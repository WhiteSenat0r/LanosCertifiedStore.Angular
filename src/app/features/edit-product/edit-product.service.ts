import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AdPostPayload } from '../add-product/models/interfaces/AdPostPayload.interface';

@Injectable({
  providedIn: 'root',
})
export class EditProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  updateAd(vehicleId: string, payload: AdPostPayload) {
    return this.http.put<void>(`${this.baseUrl}vehicles/${vehicleId}`, payload);
  }

  deleteImage(vehicleId: string, cloudImageId: string): Observable<void> {
    return this.http.delete<void>(
      this.baseUrl + `vehicles/${vehicleId}/images?imageId=${cloudImageId}`
    );
  }

  setMainImage(vehicleId: string, imageId: string): Observable<any> {
    return this.http.post(
      this.baseUrl + `vehicles/${vehicleId}/images/main`,
      null,
      {
        params: { imageId },
      }
    );
  }

  uploadPhotos(vehicleId: string, files: File[]) {
    const formData = new FormData();

    for (const file of files) {
      formData.append('images', file);
    }

    return this.http.post<any>(
      `${this.baseUrl}vehicles/${vehicleId}/images`,
      formData
    );
  }
}
