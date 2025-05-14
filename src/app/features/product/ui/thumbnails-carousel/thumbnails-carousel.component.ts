import {
  Component,
  input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import Splide from '@splidejs/splide';
import { ExtendedVehicle } from '../../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Component({
  selector: 'app-thumbnails-carousel',
  templateUrl: './thumbnails-carousel.component.html',
  styleUrl: './thumbnails-carousel.component.css',
})
export class ThumbnailsCarouselComponent implements OnChanges, OnDestroy {
  vehicle = input.required<ExtendedVehicle>();

  private mainSplide?: Splide;
  private thumbsSplide?: Splide;
  currentSlide = 0;

  ngAfterViewInit() {
    if (this.vehicle().images.length) {
      this.initSplides();
    }
  }

  ngOnChanges(): void {
    if (this.vehicle().images.length) {
      this.destroySplides();
      setTimeout(() => this.initSplides());
    }
  }

  private initSplides() {
    this.mainSplide = new Splide('#slider-main', {
      type: 'fade',
      rewind: true,
      perPage: 1,
      pagination: false,
      arrows: false,
      drag: false,
    });

    this.thumbsSplide = new Splide('#slider-thumbnails', {
      rewind: true,
      perPage: 3,
      gap: '4px',
      pagination: false,
      isNavigation: true,
      arrows: false, // ← вимкнути стрілки тут
      fixedHeight: '135px',
      direction: 'ltr',
      drag: false,
      breakpoints: {
        1024: {
          direction: 'ttb',
          height: '282px',
          fixedWidth: '170px',
          fixedHeight: '85px',
        },
      },
    });

    this.mainSplide.sync(this.thumbsSplide);
    this.mainSplide.mount();
    this.thumbsSplide.mount();

    // Оновлюємо поточний слайд для підсвічування мініатюри
    this.mainSplide.on('move', (newIndex: number) => {
      this.currentSlide = newIndex;
    });
  }

  goToSlide(index: number) {
    this.mainSplide?.go(index);
  }
  public nextSlide(): void {
    this.mainSplide?.go('+1');
  }

  public prevSlide(): void {
    this.mainSplide?.go('-1');
  }
  private destroySplides() {
    this.mainSplide?.destroy();
    this.thumbsSplide?.destroy();
    this.mainSplide = undefined;
    this.thumbsSplide = undefined;
  }

  ngOnDestroy() {
    this.destroySplides();
  }
}
