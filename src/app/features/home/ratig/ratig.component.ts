import { Component } from '@angular/core';

@Component({
  selector: 'app-ratig',
  templateUrl: './ratig.component.html',
  styleUrls: ['./ratig.component.css']
})
export class RatigComponent {

  rating: number = 0;

  showFeedback: boolean = false;
  hoverStarNumber: number = 0; 
  isHovered: boolean = false; 

  rate(index: number): void {
    this.showFeedback = true;
    if (this.rating === index) {
      this.rating = 0;
    } else {
      this.rating = index;
    }
  }

  isRated(index: number): boolean {
    return index < this.rating;
  }

  showStarNumber(starNumber: number): void {
    this.hoverStarNumber = starNumber;
    this.isHovered = true;
  }

  hideStarNumber(): void {
    this.hoverStarNumber = 0;
    this.isHovered = false;
  }
}
