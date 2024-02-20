import { Component } from '@angular/core';

@Component({
  selector: 'app-multiply-items-carousel',
  templateUrl: './multiply-items-carousel.component.html',
  styleUrls: ['./multiply-items-carousel.component.css']
})
export class MultiplyItemsCarouselComponent {
  carouselItems = [
    { image: 'assets/images/car12.png', alt: 'one' },
    { image: 'assets/images/car11.png', alt: 'two' },
    { image: 'assets/images/car13.png', alt: 'three' },
    { image: 'assets/images/car14.png', alt: 'four' },
    { image: 'assets/images/car11.png', alt: 'five' },
    { image: 'assets/images/car.png', alt: 'six' },
    // Add more items as needed
  ];

  // Convert carouselItems into pairs of items
  get carouselPairs() {
    const pairs = [];
    for (let i = 0; i < this.carouselItems.length; i += 3) {
      pairs.push([this.carouselItems[i], this.carouselItems[i + 1], this.carouselItems[i + 2]]);
    }
    return pairs;
  }
}
