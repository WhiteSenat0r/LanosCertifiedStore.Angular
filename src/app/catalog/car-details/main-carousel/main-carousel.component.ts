import { Component } from '@angular/core';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.css']
})
export class MainCarouselComponent {
  carouselItems = [
    { image: 'assets/images/car12.png', alt: 'one' },
    { image: 'assets/images/car11.png', alt: 'two' },
    { image: 'assets/images/car13.png', alt: 'three' },
    { image: 'assets/images/car14.png', alt: 'four' },
    { image: 'assets/images/car11.png', alt: 'five' },
    { image: 'assets/images/car.png', alt: 'six' },
    // Add more items as needed
  ];

}
