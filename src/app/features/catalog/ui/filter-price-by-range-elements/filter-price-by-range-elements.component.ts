import {
  Component,
  effect,
  EffectRef,
  ElementRef,
  input,
  InputSignal,
  output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-filter-price-by-range-elements',
  templateUrl: './filter-price-by-range-elements.component.html',
  styleUrl: './filter-price-by-range-elements.component.css',
})
export class FilterPriceByRangeElementsComponent {
  @ViewChild('minRange') minRange!: ElementRef<HTMLInputElement>;
  @ViewChild('maxRange') maxRange!: ElementRef<HTMLInputElement>;

  minPrice: InputSignal<number> = input.required<number>();
  maxPrice: InputSignal<number> = input.required<number>();

  minValue: number = 0;
  maxValue: number = 100;

  changePriceRange: EffectRef = effect(() => {
    this.minValue = this.minPrice();
    this.maxValue = this.maxPrice();
  })

  onMinValueChangeEmitter = output<number>();
  onMaxValueChangeEmitter = output<number>();

  onMinValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;
    if (value <= this.maxValue) {
      this.minValue = value;
      this.onMinValueChangeEmitter.emit(value);
    }

    input.value = this.minValue.toString();
  }

  onMaxValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;
    if (value >= this.minValue) {
      this.maxValue = value;
      this.onMaxValueChangeEmitter.emit(value);
    }

    input.value = this.minValue.toString();
  }
}

