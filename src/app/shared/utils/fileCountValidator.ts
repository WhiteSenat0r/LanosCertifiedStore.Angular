import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileCountValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const files = control.value as File[] | null;

    if (!files || files.length === 0) {
      return { required: true };
    }

    if (files.length < min) {
      return { minFiles: { required: min, actual: files.length } };
    }

    if (files.length > max) {
      return { maxFiles: { required: max, actual: files.length } };
    }

    return null;
  };
}
