import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-option-select-input-item',
  templateUrl: './option-select-input-item.component.html',
  styleUrls: ['./option-select-input-item.component.css'],
})
export class OptionSelectInputItemComponent {
  @ViewChild('inputElement') inputElement?: ElementRef;

  selectedOption: any | null = null;

  isDropdownVisible = false;

  @Input() options: any[] = [];
  @Output() selectedOptionChange: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();

  @Output() selectedOptionAll: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();

  @Output() inputValue: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
    if (this.isDropdownVisible) {
      if (this.inputElement) {
        //the riddle
        this.inputElement.nativeElement.value = this.selectedOption?.name ?? '';
      }
    }
  }

  selectOption(option: any | null) {
    this.selectedOption = option;
    if (this.isDropdownVisible) {
      if (this.inputElement) {
        this.inputElement.nativeElement.value = this.selectedOption?.name ?? '';
      }
    }
    this.selectedOptionChange.emit({
      option: this.selectedOption.name,
      type: this.options[0].name,
    });
  }

  clearSelectedOption() {
    this.selectedOption = null;
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
    this.selectedOptionAll.emit(this.options[0].name);
  }

  filterDropdown() {
    this.selectedOption = this.inputElement?.nativeElement.value;
    this.inputValue.emit(this.inputElement?.nativeElement.value);
  }
}
