import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-input-regular',
  templateUrl: './input-regular.component.html',
  styleUrls: ['./input-regular.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRegularComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputRegularComponent),
      multi: true,
    },
  ],
})
export class InputRegularComponent implements ControlValueAccessor, Validator {
  @Input() placeholder?: string;

  value!: string;
  onChange?: (value: string) => void;
  onTouched?: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.value) {
      return null;
    }

    return { required: true };
  }

  updateValue(event: any): void {
    this.value = event.target.value;
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
