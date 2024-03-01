import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-add-vehicle-photo',
  templateUrl: './add-vehicle-photo.component.html',
  styleUrls: ['./add-vehicle-photo.component.css'],
})
export class AddVehiclePhotoComponent {
  selectedPhoto: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.selectedPhoto = file;
    }
  }

  uploadPhoto() {
    const formData = new FormData();
    formData.append('VehicleId', 'CAFCBD04-6D53-4F76-9717-147ED19153D6');
    if(this.selectedPhoto)
    {
      console.log(this.selectedPhoto);
      formData.append('Image', this.selectedPhoto);
    }
    
  
    this.http.post<any>(environment.apiUrl + 'Vehicles/addImage', formData)
      .pipe(
        tap(response => console.log('Photo uploaded successfully:', response)),
      )
      .subscribe();
  }
}
