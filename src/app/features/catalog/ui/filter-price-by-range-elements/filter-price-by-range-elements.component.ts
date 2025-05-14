import {
  Component,
  effect,
  EffectRef,
  ElementRef,
  inject,
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

  minValueAnchor = input<number | undefined>();
  maxValueAnchor = input<number | undefined>();

  def = effect(() => {
    console.log(this.maxValueAnchor());
  });

  MinValueAnchorEffect = effect(() => {
    if (this.minValueAnchor() === undefined) {
      this.minValue = this.minPrice();
    }
  });
  MaxValueAnchoreEffect = effect(() => {
    if (this.maxValueAnchor() === undefined) {
      this.maxValue = this.maxPrice();
    }
  });

  minValue: number = 0;
  maxValue: number = 100;

  changePriceMin: EffectRef = effect(() => {
    if (
      this.maxValueAnchor() !== undefined &&
      this.maxPrice() > this.maxValueAnchor()! &&
      this.minPrice() < this.maxValueAnchor()!
    ) {
      this.maxValue = this.maxValueAnchor()!;
    }
  });

  onMinValueChangeEmitter = output<number>();
  onMaxValueChangeEmitter = output<number>();

  onMinValueChangeInfoChipEmitter = output<number | undefined>();
  onMaxValueChangeInfoChipEmitter = output<number | undefined>();

  private minValueChange$ = new Subject<number>();
  private maxValueChange$ = new Subject<number>();

  ngOnInit() {
    this.minValueChange$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.onMinValueChangeEmitter.emit(value);
        this.onMinValueChangeInfoChipEmitter.emit(value);
      });

    this.maxValueChange$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.onMaxValueChangeEmitter.emit(value);
        this.onMaxValueChangeInfoChipEmitter.emit(value);
      });
  }

  onMinValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;

    if (value < this.minPrice()) {
      this.minValue = this.minPrice();
    } else if (value < this.maxValue) {
      this.minValue = value;
    } else {
      this.minValue = this.maxValue - 1;
    }

    this.minValueChange$.next(this.minValue);
    input.value = this.minValue.toString();
  }

  onMaxValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;
    if (value > this.maxPrice()) {
      this.maxValue = this.maxPrice();
    } else if (value > this.minValue) {
      this.maxValue = value;
    } else {
      this.maxValue = this.minValue + 1;
    }
    this.maxValueChange$.next(this.maxValue);
    input.value = this.maxValue.toString();
  }
}
