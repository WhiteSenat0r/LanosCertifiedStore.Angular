import {
  AfterViewInit,
  Component,
  computed,
  Input,
  input,
  OnDestroy,
  Optional,
  Self,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  TouchedChangeEvent,
} from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input-with-symbol',
  standalone: true,
  imports: [],
  templateUrl: './input-with-symbol.component.html',
})
export class InputWithSymbolComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  private readonly destroy$ = new Subject<void>();

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  //Hooks
  ngAfterViewInit() {
    queueMicrotask(() => this.initControl());
  }

  // Inputs
  label = input.required<string>();
  symbol = input<string>();
  placeholder = input<string>();

  // Signals
  @Input() inputType: 'string' | 'number' = 'string';
  inputText = signal<string>('');
  showError = signal(false);
  readonly controlErrors = signal<Record<string, any> | null>(null);

  inputIsFocused = signal(false);

  //Computed Errors
  readonly errorMessage = computed(() => {
    const errors = this.controlErrors();
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return `Поле "${this.label()}" є обов'язковим`;
    }

    if (errors['maxlength']) {
      return `Максимальна довжина: ${errors['maxlength'].requiredLength}`;
    }

    if (errors['minlength']) {
      return `Мінімальна довжина: ${errors['minlength'].requiredLength}`;
    }

    if (errors['pattern']) {
      const required = errors['pattern'].requiredPattern;
      switch (required) {
        case '/^\\d+$/':
          return 'Тільки цілі невід’ємні числа (без пробілів, літер і десяткових)';
        case '/^(0\\.[5-9]|[1-9](\\.[0-9])?)$/':
          return 'Неправильний формат обʼєму двигуна. Приклади: 0.5, 1, 2.4';
        case '/^[A-HJ-NPR-Z0-9]{17}$/':
          return 'VIN повинен містити 17 символів: цифри та великі літери (окрім I, O, Q)';
        default:
          return 'Невірний формат';
      }
    }

    if (errors['max']) {
      return `Максимальне значення: ${errors['max'].max}`;
    }

    return 'Невірне значення';
  });
  //Methods
  onFocus() {
    this.inputIsFocused.set(true);
  }

  onBlur() {
    this.inputIsFocused.set(false);
  }

  //Event methods
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.inputText.set(value);

    if (this.inputType === 'number') {
      const numericValue = value === '' ? null : Number(value);
      this.onChange(numericValue);
    } else {
      this.onChange(value === '' ? null : value);
    }
  }

  // CVA Methods
  onChange: (value: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | number | null): void {
    if (value) {
      this.inputText.set(String(value));
    } else {
      this.inputText.set('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  //Private methods
  private initControl() {
    const control = this.ngControl?.control;
    if (!control) {
      console.warn('[Autocomplete] control still undefined');
      return;
    }

    control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const isErrorVisible = control.invalid && control.touched;
      this.showError.set(isErrorVisible);
      this.controlErrors.set(control.errors);
    });
    control.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is TouchedChangeEvent => e instanceof TouchedChangeEvent)
      )
      .subscribe(() => {
        const isErrorVisible = control.invalid && control.touched;
        this.showError.set(isErrorVisible);
        this.controlErrors.set(control.errors);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
