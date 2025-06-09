import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-outline-check',
  standalone: true,
  imports: [],
  templateUrl: './icon-outline-check.component.html',
})
export class IconOutlineCheckComponent {
  svgClass = input<string>();
}
