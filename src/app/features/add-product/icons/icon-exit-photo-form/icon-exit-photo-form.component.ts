import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-exit-photo-form',
  standalone: true,
  imports: [],
  templateUrl: './icon-exit-photo-form.component.html'
})
export class IconExitPhotoFormComponent {
  svgClass = input<string>();
}
