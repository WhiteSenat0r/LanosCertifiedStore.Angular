import { Component, Input } from '@angular/core';
import { Image } from 'src/app/shared/models/image';

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

  @Input() vehicleImages!: Image[];

  get getSortedVehiclesByMainImage(): Image[] {
    let sortedVehicles: Image[] = [];
    let mainPhotoIndex: number = -1;
    
    for (let i = 0; i < this.vehicleImages.length; i++) {
      if (this.vehicleImages[i].isMainImage === true) {
        mainPhotoIndex = i;
        break;
      }
    }
    if (mainPhotoIndex !== -1) {
      sortedVehicles.push(this.vehicleImages[mainPhotoIndex]);
    }
    for (let i = 0; i < this.vehicleImages.length; i++) {
      if (i !== mainPhotoIndex) {
        sortedVehicles.push(this.vehicleImages[i]);
      }
    }
  
    return sortedVehicles;
  }

}
