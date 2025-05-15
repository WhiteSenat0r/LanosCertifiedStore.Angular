import {
  AfterViewInit,
  Component,
  Input,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-similar-products-carousel',
  templateUrl: './similar-products-carousel.component.html',
  styleUrl: './similar-products-carousel.component.css',
})
export class SimilarProductsCarouselComponent implements OnChanges {
  @Input({ required: true }) vehicles: Vehicle[] = [];

  private otherProductsSplide?: Splide;

  goToVehiclePage = output<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicles'] && this.vehicles?.length) {
      if (this.otherProductsSplide) {
        this.otherProductsSplide.destroy();
      }

      setTimeout(() => {
        this.initSplide();
      }, 0);
    }
  }

  private initSplide() {
    this.otherProductsSplide = new Splide('#slider-other-products', {
      type: 'loop',
      perPage: 3,
      // perMove: 1,
      gap: '14px',
      padding: { right: '254px' },
      pagination: false,
      arrows: false,
      drag: false,
      breakpoints: {
        1280: {
          perPage: 3,
          padding: { right: '200px' },
        },
        1024: {
          perPage: 2,
          padding: { right: '200px' },
        },
        768: {
          perPage: 1,
        },
        640: {
          padding: { right: '140px' },
        },
      },
    }).mount();
  }

  public nextSlide(): void {
    const width = window.innerWidth;
    if (width <= 1024) {
      if (width <= 640) {
        this.otherProductsSplide?.go('+1');
      } else {
        this.otherProductsSplide?.go('+2');
      }
    } else {
      this.otherProductsSplide?.go('+3');
    }
  }

  // public prevSlide(): void {
  //   this.otherProductsSplide?.go('-1');
  // }

  goToVehicleProductPage(vehicle: Vehicle) {
    this.goToVehiclePage.emit(vehicle.id);
  }

  handleImageError(event: Event, vehicle: Vehicle): void {
    // Оновлюємо URL зображення в масиві vehicles
    const vehicleIndex = this.vehicles.findIndex((v) => v === vehicle);
    if (vehicleIndex !== -1) {
      this.vehicles[vehicleIndex] = {
        ...vehicle,
        mainImageUrl: 'assets/images/Home/car-placeholder2.png',
      };
      // Reload slider after changing URL
      if (this.otherProductsSplide) {
        this.otherProductsSplide.destroy();
        setTimeout(() => {
          this.initSplide();
        });
      }
    }
  }
}
