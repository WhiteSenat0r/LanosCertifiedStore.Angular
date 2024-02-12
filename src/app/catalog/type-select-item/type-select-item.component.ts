import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Type } from "../../shared/models/type";
import { Brand } from "../../shared/models/brand";

@Component({
  selector: 'app-type-select-item',
  templateUrl: './type-select-item.component.html',
  styleUrls: ['./type-select-item.component.css']
})
export class TypeSelectItemComponent {
  selectedOption: Type | null = null;

  isDropdownVisible = false;

  @Input() types: Type[] = [];

  @Output() selectedOptionChange: EventEmitter<Type | null> = new EventEmitter<Type | null>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }



  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible
  }

  selectOption(option: Type | null) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption)
  }
}
