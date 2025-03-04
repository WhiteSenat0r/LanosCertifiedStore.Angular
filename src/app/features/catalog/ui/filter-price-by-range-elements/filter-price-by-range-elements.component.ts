import {
  Component,
  effect,
  EffectRef,
  ElementRef,
  input,
  InputSignal,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter-price-by-range-elements',
  templateUrl: './filter-price-by-range-elements.component.html',
  styleUrl: './filter-price-by-range-elements.component.css',
})
export class FilterPriceByRangeElementsComponent implements OnInit {
  @ViewChild('minRange') minRange!: ElementRef<HTMLInputElement>;
  @ViewChild('maxRange') maxRange!: ElementRef<HTMLInputElement>;

  minPrice: InputSignal<number> = input.required<number>();
  maxPrice: InputSignal<number> = input.required<number>();

  minValue: number = 0;
  maxValue: number = 100;

  changePriceRange: EffectRef = effect(() => {
    this.minValue = this.minPrice();
    this.maxValue = this.maxPrice();
  });

  onMinValueChangeEmitter = output<number>();
  onMaxValueChangeEmitter = output<number>();

  private minValueChange$ = new Subject<number>();
  private maxValueChange$ = new Subject<number>();

  ngOnInit() {
    this.minValueChange$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => this.onMinValueChangeEmitter.emit(value));

    this.maxValueChange$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => this.onMaxValueChangeEmitter.emit(value));
  }

  onMinValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;
    if (value <= this.maxValue) {
      this.minValue = value;
      this.minValueChange$.next(value);
    }

    input.value = this.minValue.toString();
  }

  onMaxValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;
    if (value >= this.minValue) {
      this.maxValue = value;
      this.maxValueChange$.next(value);
    }

    input.value = this.minValue.toString();
  }
}
