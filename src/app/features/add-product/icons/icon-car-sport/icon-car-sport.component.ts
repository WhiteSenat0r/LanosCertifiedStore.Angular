import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-car-sport',
  standalone: true,
  imports: [],
  templateUrl: './icon-car-sport.component.html',
})
export class IconCarSportComponent {
  svgClass = input<string>();
}
