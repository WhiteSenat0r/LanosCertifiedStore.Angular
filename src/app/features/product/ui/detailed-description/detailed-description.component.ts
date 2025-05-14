import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-detailed-description',
  templateUrl: './detailed-description.component.html',
  styleUrl: './detailed-description.component.css',
})
export class DetailedDescriptionComponent {
  show = signal<boolean>(false);

  showMore() {
    this.show.set(true);
  }
}
