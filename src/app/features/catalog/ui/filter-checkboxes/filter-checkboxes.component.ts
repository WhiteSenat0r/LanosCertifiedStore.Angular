import { Component, input } from '@angular/core';

@Component({
  selector: 'app-filter-checkboxes',
  templateUrl: './filter-checkboxes.component.html',
  styleUrl: './filter-checkboxes.component.css'
})
export class FilterCheckboxesComponent {
    filterType = input.required<string>();
}
