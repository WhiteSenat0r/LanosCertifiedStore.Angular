import { Component, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-photo-upload-form',
  templateUrl: './photo-upload-form.component.html',
})
export class PhotoUploadFormComponent {
  //State
  form = new FormGroup<any>({});

  //Outputs
  save = output<void>();
  cancel = output<void>();

  onSubmit() {
    console.log('published');
  }
}
