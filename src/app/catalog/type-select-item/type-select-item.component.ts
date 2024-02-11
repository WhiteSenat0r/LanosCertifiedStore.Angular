import {Component, Input} from '@angular/core';
import {brands} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Type} from "../../shared/models/type";
import {Brand} from "../../shared/models/brand";

@Component({
  selector: 'app-type-select-item',
  templateUrl: './type-select-item.component.html',
  styleUrls: ['./type-select-item.component.css']
})
export class TypeSelectItemComponent {
  selectedOption: Type | null = null;

  isDropdownVisible = false;

  @Input() types: Type[] = [];

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible
  }

  selectOption(option: Type) {
    this.selectedOption = option;
  }
}
