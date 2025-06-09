import { Component, computed, effect, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface HasIdAndName {
  id: string;
  name: string;
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent<T extends HasIdAndName> {
  //State
  showDropdown = signal<boolean>(false);

  //Inputs
  label = input.required<string>();
  placeholder = input<string>();
  formControlRef = input.required<FormControl<T | number | null>>();
  options = input.required<T[] | number[] | undefined>();

  //Computed validation state
  errorMessage = computed(() => {
    const errors = this.formControlRef().errors;

    if (!errors) return '';

    if (errors['required']) {
      return "Це поле є обов'язковим";
    }

    return 'Помилка введення';
  });

  showError = computed(() => {
    return (
      this.formControlRef().invalid &&
      (this.formControlRef().touched || this.formControlRef().dirty)
    );
  });

  //Computed ui state

  //Methods
}
