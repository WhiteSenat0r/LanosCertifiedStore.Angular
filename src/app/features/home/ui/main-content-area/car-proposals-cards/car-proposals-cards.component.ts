import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

@Component({
  selector: 'app-car-proposals-cards',
  templateUrl: './car-proposals-cards.component.html',
})
export class CarProposalsCardsComponent implements AfterViewInit {
  swiperParams1 = {
    slidesPerView:1,
    loop:true,
    //spaceBetween:16,
    spaceBetween:20,
    navigation: {
      nextEl: ".custom-button-next",
      prevEl: ".custom-button-prev",
    },

    breakpoints:{
      480:{
        slidesPerView:2,
   
      },
      1040:{
        slidesPerView:3,
      }
    },
    on: {
      init () {
        // ...
      }
    }
  }

  ngAfterViewInit(): void {
    const swiperEl = document.querySelector('swiper-container');

    if(swiperEl)
    {
      Object.assign(swiperEl, this.swiperParams1);
      swiperEl.initialize();
    }
  }

  bodyTypeImages: string[] = [
    'assets/images/bodyTypeImages/cabriolet.png',
    'assets/images/bodyTypeImages/coupe.png',
    'assets/images/bodyTypeImages/crossover.png',
    'assets/images/bodyTypeImages/liftback.png',
    'assets/images/bodyTypeImages/minivan.png',
    'assets/images/bodyTypeImages/pickup-truck.png',
    'assets/images/bodyTypeImages/sedan.png',
    'assets/images/bodyTypeImages/universal.png',
  ];
}