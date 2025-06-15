import {
  ChangeDetectorRef,
  Component,
  effect,
  EffectRef,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
  untracked,
  viewChild,
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
  private cdr = inject(ChangeDetectorRef);
  readonly maxRange = viewChild<ElementRef<HTMLInputElement>>('maxRange');

  maxRangeBinding = effect(() => {
    if (this.maxPrice()) {
      untracked(() => {
        const max = this.maxValue();
        const elRef = this.maxRange();
        if (elRef) {
          elRef.nativeElement.value = String(max);
          this.cdr.detectChanges();
        }
      });
    }
  });

  minPrice: InputSignal<number> = input.required<number>();
  maxPrice: InputSignal<number> = input.required<number>();

  minValueAnchor = input<number | undefined>();
  maxValueAnchor = input<number | undefined>();

  // UI state
  minValue = signal<number>(0);
  maxValue = signal<number>(100);

  MinValueAnchorEffect = effect(() => {
    if (this.minValueAnchor() !== undefined) {
      untracked(() => {
        this.minValue.set(this.minValueAnchor()!);
      });
    }
  });
  MaxValueAnchorEffect = effect(() => {
    const newMaxValueAnchor = this.maxValueAnchor();
    if (newMaxValueAnchor !== undefined) {
      untracked(() => {
        this.maxValue.set(newMaxValueAnchor);
      });
    }
  });

  onMinValueChangeEmitter = output<number>();
  onMaxValueChangeEmitter = output<number>();

  private minValueChange$ = new Subject<number>();
  private maxValueChange$ = new Subject<number>();
  ngOnInit() {
    this.minValueChange$
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((value) => {
        this.onMinValueChangeEmitter.emit(value);
      });

    this.maxValueChange$
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((value) => {
        this.onMaxValueChangeEmitter.emit(value);
      });
  }

  onMinValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;

    if (value < this.minPrice()) {
      this.minValue.set(this.minPrice());
    } else if (value < this.maxValue()) {
      this.minValue.set(value);
    } else {
      this.minValue.set(this.maxValue() - 1);
    }

    this.minValueChange$.next(this.minValue());
    input.value = this.minValue.toString();
  }

  onMaxValueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = +input.value;
    if (value > this.maxPrice()) {
      this.maxValue.set(this.maxPrice());
    } else if (value > this.minValue()) {
      this.maxValue.set(value);
    } else {
      this.maxValue.set(this.minValue() + 1);
    }
    this.maxValueChange$.next(this.maxValue());
    input.value = this.maxValue.toString();
  }
}
