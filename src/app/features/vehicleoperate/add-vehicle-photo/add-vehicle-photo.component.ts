import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-add-vehicle-photo',
  templateUrl: './add-vehicle-photo.component.html',
  styleUrls: ['./add-vehicle-photo.component.css'],
})
export class AddVehiclePhotoComponent implements OnInit {
  selectedPhoto: File | null = null;
  vehicleId: string = '';
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit()
  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    this.vehicleId = id.toString();
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.selectedPhoto = file;
    }
  }

  uploadPhoto() {
    const formData = new FormData();
    formData.append('VehicleId', this.vehicleId);
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

    this.router.navigateByUrl(`/catalog/${this.vehicleId}`);
  }
}
