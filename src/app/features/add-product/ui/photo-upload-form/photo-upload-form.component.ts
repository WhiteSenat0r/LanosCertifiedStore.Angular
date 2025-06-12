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
  save = output<void>();
  cancel = output<void>();

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('form is invalid');
      return;
    }
    const files = this.form.controls.photos.value;
    console.log('Завантажено фото:', files);
  }
}
