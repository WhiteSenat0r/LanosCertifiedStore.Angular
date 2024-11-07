import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-slider-default',
  templateUrl: './slider-default.component.html',
  styleUrls: ['./slider-default.component.css'],
})
export class SliderDefaultComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vehicles?: any[];

  splide?: Splide;
  currentSlide: number = 0;

  ngOnInit(): void {
    console.log(this.vehicles);
  }

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
    this.splide = new Splide('#default-slider', {
      type: 'loop',
      perPage: 4,
      pagination: false,
      focus: 0,
      gap: '1rem',
      arrows: false,
      drag:false,
      breakpoints: {
        1024: { perPage: 3 },
        768: { perPage: 2, padding: {right: '10rem'}, drag: true },
        640: { perPage: 2, padding: '0rem'}
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