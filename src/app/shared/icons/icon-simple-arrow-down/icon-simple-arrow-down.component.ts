import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-simple-arrow-down',
  standalone: true,
  imports: [],
  templateUrl: './icon-simple-arrow-down.component.html'
})
export class IconSimpleArrowDownComponent {
  svgClass = input<string>();
}
