import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-outline-trash',
  standalone: true,
  imports: [],
  templateUrl: './icon-outline-trash.component.html',
})
export class IconOutlineTrashComponent {
  svgClass = input<string>();
}
