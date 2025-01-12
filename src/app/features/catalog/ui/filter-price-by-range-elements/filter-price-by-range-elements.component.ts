import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-price-by-range-elements',
  templateUrl: './filter-price-by-range-elements.component.html',
  styleUrl: './filter-price-by-range-elements.component.css',
})
export class FilterPriceByRangeElementsComponent {
  minValue: number = 20;
  maxValue: number = 80;

  onMinValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;

    if (value >= this.maxValue) {
      this.minValue = this.maxValue - 1;
    } else {
      this.minValue = value;
    }
  }

  onMaxValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;

    if (value <= this.minValue) {
      this.maxValue = this.minValue + 1;
    } else {
      this.maxValue = value;
    }
  }
}