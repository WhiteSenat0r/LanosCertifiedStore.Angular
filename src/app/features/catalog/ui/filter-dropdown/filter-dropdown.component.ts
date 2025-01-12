import { Component, Input } from '@angular/core';
import { SvgIconDisplayComponent } from '../../../../shared/utils/svg-icon-display.component';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrl: './filter-dropdown.component.css'
})
export class FilterDropdownComponent {
  @Input({required: true}) placeHolder!: string;
}
