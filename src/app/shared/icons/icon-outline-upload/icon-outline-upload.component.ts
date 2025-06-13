import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-outline-upload',
  standalone: true,
  imports: [],
  templateUrl: './icon-outline-upload.component.html',
})
export class IconOutlineUploadComponent {
  svgClass = input<string>();
}
