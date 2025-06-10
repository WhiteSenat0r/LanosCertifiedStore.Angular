import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  Optional,
  Self,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
  TouchedChangeEvent,
} from '@angular/forms';
import { HasIdAndName, isHasIdAndName } from '../../../utils/isHasIdAndName';
import { trigger, style, transition, animate } from '@angular/animations';
import { IconSimpleArrowDownComponent } from '../../../icons/icon-simple-arrow-down/icon-simple-arrow-down.component';
import { IconSimpleCrossComponent } from '../../../icons/icon-simple-cross/icon-simple-cross.component';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconSimpleArrowDownComponent,
    IconSimpleCrossComponent,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate(
          '120ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '75ms ease-in',
          style({ transform: 'translateY(-10px)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class AutocompleteComponent<T extends HasIdAndName>
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  private readonly destroy$ = new Subject<void>();
  //Injections
  private readonly elementRef = inject(ElementRef);

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  //Hooks
  ngAfterViewInit() {
    queueMicrotask(() => this.initControl());
  }

  //Utils
  public isHasIdAndName = isHasIdAndName;

  //State
  showDropdown = signal<boolean>(false);
  inputText = signal<string>('');
  showError = signal(false);

  readonly controlErrors = signal<Record<string, any> | null>(null);

  //Inputs
  label = input.required<string>();
  placeholder = input<string>();
  options = input.required<T[] | number[] | undefined>();

  //Computed ui state
  filteredOptions = computed(() => {
    const text = this.inputText().toLowerCase().trim();
    const opts = this.options() ?? [];
    if (isHasIdAndName(opts[0])) {
      const objectOptions = opts as T[];
      return objectOptions.filter((opt) =>
        opt.name.toLowerCase().includes(text)
      );
    } else {
      const numberOptions = opts as number[];
      return numberOptions.filter((opt) => String(opt).includes(text));
    }
  });

  //Computed Errors
  readonly errorMessage = computed(() => {
    const errors = this.controlErrors();
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return `Поле "${this.label()}" є обов'язковим`;
    }

    return 'Невірне значення';
  });

  //Methods
  //Template Events
  liElementClicked(element: T | number) {
    if (isHasIdAndName(element)) {
      this.inputText.set(element.name);
    } else {
      this.inputText.set(element.toString());
    }
    this.onChange(element);
    this.showDropdown.set(false);
  }

  crossElementClicked() {
    this.inputText.set('');
    this.onChange(null);
    this.showDropdown.set(false);
  }

  onFocus() {
    this.showDropdown.set(true);
    // this.onTouched();
  }

  onSimpleArrowClick() {
    this.showDropdown.set(true);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.inputText.set(value);
    this.onChange(null);
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.showDropdown()) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.showDropdown.set(false);

      if (this.showError()) {
        this.inputText.set('');
      }
    }
  }
  // CVA Methods
  onChange: (value: T | number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: T | number | null): void {
    if (value) {
      if (isHasIdAndName(value)) {
        this.inputText.set(value.name);
      } else {
        this.inputText.set(String(value));
      }
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
