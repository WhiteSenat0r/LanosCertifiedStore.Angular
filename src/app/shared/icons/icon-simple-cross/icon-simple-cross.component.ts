import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-simple-cross',
  standalone: true,
  imports: [],
  templateUrl: './icon-simple-cross.component.html',
})
export class IconSimpleCrossComponent {
  svgClass = input<string>();
}
