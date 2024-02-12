import {Component, ElementRef, HostListener, Input} from '@angular/core';
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

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible
  }

  selectOption(option: Type) {
    this.selectedOption = option;
  }
}
