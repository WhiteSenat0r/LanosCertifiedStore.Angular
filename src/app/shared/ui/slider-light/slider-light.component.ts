import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import Splide from '@splidejs/splide';
import { Vehicle } from '../../models/ApiModels/Vehicle';

@Component({
  selector: 'app-slider-light',
  templateUrl: './slider-light.component.html',
  styleUrl: './slider-light.component.css'
})
export class SliderLightComponent implements OnChanges, OnDestroy {
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
    this.splide = new Splide('#light-slider', {
      type: 'loop',
      perPage: 4,
      pagination: false,
      focus: 0,
      gap: '1rem',
      arrows: false,
      drag: false,
      breakpoints: {
        1024: { perPage: 3 },
        768: { perPage: 2, padding: { right: '10rem' }, drag: true },
        640: { perPage: 2, padding: '0rem' },
        500: {perPage: 1, padding: '0rem'},
      },
    }).mount();

    this.splide.on('move', (newIndex) => {
      this.currentSlide = newIndex;
    }) 
  }

  goToSlide(index: number) {
    this.splide?.go(index);
  }

  nextSlider() {
    this.splide?.go('+1');
  }

  prevSlider() {
    this.splide?.go('-1');
  }

  ngOnDestroy() {
    if (this.splide) {
      this.splide.destroy();
    }
  }
}

