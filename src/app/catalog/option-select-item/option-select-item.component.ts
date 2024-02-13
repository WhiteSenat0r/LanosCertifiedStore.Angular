import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Type } from 'src/app/shared/models/type';

@Component({
  selector: 'app-option-select-item',
  templateUrl: './option-select-item.component.html',
  styleUrls: ['./option-select-item.component.css']
})
export class OptionSelectItemComponent {
  selectedOption: any | null = null;

  isDropdownVisible = false;

  @Input() options: any[] = [];
  @Output() selectedOptionChange: EventEmitter<any | null> =
    new EventEmitter<any | null>();

  @Output() selectedOptionAll: EventEmitter<any | null> =
    new EventEmitter<any | null>();

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

  selectOption(option: any | null) {
    this.selectedOption = option;
    this.selectedOptionChange.emit({ option: this.selectedOption.name, type: this.options[0].name })
  }

  clearSelectedOption() {
    this.selectedOption = null;
    this.selectedOptionAll.emit(this.options[0].name)
  }
}
