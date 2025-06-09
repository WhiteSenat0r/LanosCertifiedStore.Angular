import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-outline-chevron-right',
  standalone: true,
  imports: [],
  templateUrl: './icon-outline-chevron-right.component.html',
})
export class IconOutlineChevronRightComponent {
  svgClass = input<string>();
}
