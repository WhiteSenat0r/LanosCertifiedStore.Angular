import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-photo-upload-section',
  templateUrl: './photo-upload-section.component.html',
  styleUrl: './photo-upload-section.component.css',
})
export class PhotoUploadSectionComponent {
  //State
  form = input.required<FormGroup<{ photos: FormControl<File[] | null> }>>();
}
