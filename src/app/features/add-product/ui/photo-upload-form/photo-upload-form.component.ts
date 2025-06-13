import { Component, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fileCountValidator } from '../../../../shared/utils/fileCountValidator';

@Component({
  selector: 'app-photo-upload-form',
  templateUrl: './photo-upload-form.component.html',
})
export class PhotoUploadFormComponent {
  //State
  form = new FormGroup({
    photos: new FormControl<File[] | null>(null, fileCountValidator(1, 5)),
  });

  //Outputs
  uploadPhotos = output<File[]>();
  goToProfile = output<void>();

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.invalid) {
      const files = this.form.controls.photos.value;
      this.uploadPhotos.emit(files!);
    }
  }
}
