import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  cards = [
    { title: 'Заголовок 1', priceUAH: '379 500 грн', priceUSD: '10 000 $', imageUrl: './assets/images/cars/car3.png', isHovered: false },
    { title: 'Заголовок 2', priceUAH: '379 500 грн', priceUSD: '10 000 $', imageUrl: './assets/images/cars/car2.png', isHovered: false },
    { title: 'Заголовок 3', priceUAH: '379 500 грн', priceUSD: '10 000 $', imageUrl: './assets/images/cars/car1.png', isHovered: false },
    { title: 'Заголовок 4', priceUAH: '379 500 грн', priceUSD: '10 000 $', imageUrl: './assets/images/cars/car2.png', isHovered: false },
    { title: 'Заголовок 5', priceUAH: '379 500 грн', priceUSD: '10 000 $', imageUrl: './assets/images/cars/car3.png', isHovered: false },
    { title: 'Заголовок 6', priceUAH: '379 500 грн', priceUSD: '10 000 $', imageUrl: './assets/images/cars/car1.png', isHovered: false },
    
  ];

  isHovered = false;

  loadMore() {
  }
}
