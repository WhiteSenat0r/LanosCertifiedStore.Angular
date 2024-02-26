import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-option-select-model',
  templateUrl: './option-select-model.component.html',
  styleUrls: ['./option-select-model.component.css']
})
export class OptionSelectModelComponent implements OnChanges {
  @Input() selectedOptionCheck?: string;

  @ViewChild('inputInside') inputInside!: ElementRef;
  @ViewChild('inputButton') inputButton!: ElementRef;

  selectedOption: any | null = null;

  isDropdownVisible = false;

  @Input() options: any[] = [];

  filteredOptions: any[] = [];

  @Output() selectedOptionChange: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();

  @Output() selectedOptionAll: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();

  constructor(private elementRef: ElementRef) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.updateFilteredOptions();
      if (this.inputInside) {
        if (this.selectedOptionCheck) {
          this.inputInside.nativeElement.value = this.selectedOptionCheck;
          this.filterOptions();
          this.selectedOption = this.filteredOptions[0];
        }
        else{
          this.inputInside.nativeElement.value = '';
        }
      }
      this.selectedOption = null;
    }
  }

  updateFilteredOptions() {
    if (this.options && this.options.length > 0) {
      this.filteredOptions = this.options.slice(1);
    } else {
      this.filteredOptions = [];
    }
  }

  filterOptions() {
    const searchTerm = this.inputInside.nativeElement.value;

    if (searchTerm) {
      this.filteredOptions = this.options.slice(1).filter((option) => {
        const isMatch = option.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
        return isMatch;
      });
    } else {
      this.filteredOptions = this.options.slice(1);
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleFocus() {
    this.inputInside.nativeElement.focus();
    this.toggleDropdown();
  }

  selectOption(option: any | null) {
    this.selectedOption = option;
    this.inputInside.nativeElement.value = option.name;
    this.filterOptions();
    this.selectedOptionChange.emit({
      option: this.selectedOption.name,
      type: this.options[0].name,
    });
  }

  clearSelectedOption() {
    this.selectedOption = null;
    this.inputInside.nativeElement.value = null;
    this.filterOptions();
    this.selectedOptionAll.emit(this.options[0].name);
  }
}
