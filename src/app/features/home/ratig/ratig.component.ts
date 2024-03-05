import { Component } from '@angular/core';

@Component({
  selector: 'app-ratig',
  templateUrl: './ratig.component.html',
  styleUrls: ['./ratig.component.css']
})
export class RatigComponent {
  rating: number = 0;

  rate(index: number): void {
    if (this.rating === index) {
      this.rating = 0;
    } else {
      this.rating = index;
    }
  }

  isRated(index: number): boolean {
    return index < this.rating;
  }
}
