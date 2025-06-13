import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function vinCodeValidator(): ValidatorFn {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return { required: true };
    const vin = control.value.toUpperCase().replace(/\s/g, '');
    if (vin.length !== 17)
      return { minlength: { requiredLength: 17, actualLength: vin.length } };
    if (!vinRegex.test(vin))
      return {
        pattern: { requiredPattern: vinRegex.toString(), actualValue: vin },
      };
    return null;
  };
}
