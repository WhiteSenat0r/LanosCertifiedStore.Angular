import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-photo-camera',
  standalone: true,
  imports: [],
  templateUrl: './icon-photo-camera.component.html'
})
export class IconPhotoCameraComponent {
  svgClass = input<string>();
}
