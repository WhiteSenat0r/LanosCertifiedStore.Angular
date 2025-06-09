import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-document-text',
  standalone: true,
  imports: [],
  templateUrl: './icon-document-text.component.html'
})
export class IconDocumentTextComponent {
  svgClass = input<string>();
}
