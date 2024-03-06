import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { OptionIdentity } from '../models/optionIdentity';
import { OptionTypePair } from '../models/optionTypePair';

@Component({
  selector: 'app-dropdown-typeahead',
  templateUrl: './dropdown-typeahead.component.html',
  styleUrls: ['./dropdown-typeahead.component.css'],
})
export class DropdownTypeaheadComponent implements OnChanges, AfterViewInit {
  selectedOption: string = '';
  filteredOptions: OptionIdentity[] = [];
  isDropdownVisible = false;

  @ViewChild('inputInside') inputInside?: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.updateFilteredOptions();
      this.selectedOption = this.choiceOption;
    }
  }

  ngAfterViewInit(): void {
    if (this.placeholder) {
      const input = this.inputInside?.nativeElement as HTMLInputElement;
      input.placeholder = this.placeholder;
    }
    if (this.selectedOption) {
      const input = this.inputInside?.nativeElement as HTMLInputElement;
      input.value = this.selectedOption;
    }
  }

  updateFilteredOptions(): void {
    if (this.options && this.options.length > 0) {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = [];
    }
    if (this.selectedOption) {
      this.selectedOption = this.choiceOption;
      if (this.inputInside?.nativeElement) {
        const input = this.inputInside?.nativeElement as HTMLInputElement;
        input.value = this.selectedOption;
      }
    }
  }

  filterOptions(): void {
    const input = this.inputInside?.nativeElement as HTMLInputElement;
    const searchTerm = input.value as string;
    if (searchTerm) {
      this.filteredOptions = this.options.filter((option) => {
        const isMatch = option.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
        return isMatch;
      });
    } else {
      this.filteredOptions = this.options;
    }
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  selectOption(option: OptionIdentity): void {
    const input = this.inputInside?.nativeElement as HTMLInputElement;
    input.value = option.name;
    this.selectedOption = option.name;
    this.filterOptions();
    this.selectedOptionChange.emit({ data: option, type: this.placeholder });
  }

  clearSelectedOption(): void {
    const input = this.inputInside?.nativeElement as HTMLInputElement;
    input.value = '';
    this.selectedOption = '';
    this.filterOptions();
    this.selectedOptionChange.emit({
      data: { id: '', name: '' },
      type: this.placeholder,
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
      this.onComponentClick.emit(false);
    } else {
      this.onComponentClick.emit(true);
    }
  }

  @Input({ required: true }) options!: OptionIdentity[];
  @Input() placeholder: string = '';
  @Input() choiceOption: string = '';
  @Output() selectedOptionChange: EventEmitter<OptionTypePair<OptionIdentity>> =
    new EventEmitter<OptionTypePair<OptionIdentity>>();
  @Output() onComponentClick: EventEmitter<boolean> =
    new EventEmitter<boolean>();
}
