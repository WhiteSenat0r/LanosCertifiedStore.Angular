import {Component} from '@angular/core';
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

  isDropdownVisible = true;

  types: Type[] = [
    {id: 1, name: "1type"},
    {id: 2, name: "2 type"},
    {id: 3, name: "3 type"}];

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible
  }

  selectOption(option: Type) {
    this.selectedOption = option;
  }
}
