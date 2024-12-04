import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import Splide from '@splidejs/splide';
import { Vehicle } from '../../models/BaseApiModels/Vehicle';

@Component({
  selector: 'app-slider-default',
  templateUrl: './slider-default.component.html',
  styleUrls: ['./slider-default.component.css'],
})
export class SliderDefaultComponent implements OnChanges, OnDestroy {
  handleImageError(event: Event, vehicle: Vehicle): void {
    // Оновлюємо URL зображення в масиві vehicles
    const vehicleIndex = this.vehicles.findIndex((v) => v === vehicle);
    if (vehicleIndex !== -1) {
      this.vehicles[vehicleIndex] = {
        ...vehicle,
        mainImageUrl: 'assets/images/Home/car-placeholder2.png',
      };
      // Перезавантажуємо слайдер після зміни URL
      if (this.splide) {
        this.splide.destroy();
        setTimeout(() => {
          this.initializeSplide();
        });
      }
    }
  }
  @Input() vehicles: Vehicle[] = [];

  splide?: Splide;
  currentSlide: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicles'] && this.vehicles?.length) {
      if (this.splide) {
        this.splide.destroy();
      }

      // It's important, so it to be initialized after Angular render DOM
      setTimeout(() => {
        this.initializeSplide();
      });
    }
  }

  private initializeSplide() {
    const perPageLimit = Math.min(4, this.vehicles.length)
    this.splide = new Splide('#default-slider', {
      type: 'loop',
      perPage: perPageLimit,
      pagination: false,
      focus: 0,
      gap: '1rem',
      arrows: false,
      drag: false,
      breakpoints: {
        1024: { perPage: Math.min(3, this.vehicles.length) },
        768: { perPage: Math.min(2, this.vehicles.length), padding: { right: '10rem' }, drag: true },
        640: { perPage: Math.min(2, this.vehicles.length), padding: '0rem' },
        500: { perPage: Math.min(1, this.vehicles.length), padding: '0rem' },
      },
    }).mount();

    this.splide.on('move', (newIndex) => {
      this.currentSlide = newIndex;
    });
  }

  goToSlide(index: number) {
    this.splide?.go(index);
  }

  nextSlider() {
    this.splide?.go('+1');
  }

  prevSlider() {
    this.splide?.go('-1');
    console.log(JSON.stringify(this.vehicles));
  }

  ngOnDestroy() {
    if (this.splide) {
      this.splide.destroy();
    }
  }
}
