import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { OptionIdentity } from '../models/optionIdentity';
import { OptionTypePair } from '../models/optionTypePair';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-dropdown-typeahead',
  templateUrl: './dropdown-typeahead.component.html',
  styleUrls: ['./dropdown-typeahead.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownTypeaheadComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownTypeaheadComponent),
      multi: true,
    },
  ],
})
export class DropdownTypeaheadComponent
  implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator {
  @Input({ required: true }) options!: OptionIdentity[];
  @Input({ required: true }) type!: string;
  @Input() placeholder?: string | undefined;

  /*Only OnInit Option*/
  @Input() choiceOption?: string | undefined;

  @Output() selectedOptionChange: EventEmitter<OptionTypePair<OptionIdentity>> =
    new EventEmitter<OptionTypePair<OptionIdentity>>();
  @Output() onComponentClick: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /*For easy way showing selectedOption to a user*/
  selectedOption: string | undefined;
  filteredOptions: OptionIdentity[] = [];
  isDropdownVisible: boolean = false;

  @ViewChild('inputInside') inputInside!: ElementRef;

  /* for reactive forms */
  value!: string;
  onChange?: (value: string) => void;
  onTouched?: () => void;

  constructor(private elementRef: ElementRef) { }

  writeValue(value: string): void {
    this.value = value;
    const searchTerm = value as string;
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

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  private emitChange(value: string): void {
    if (this.onChange) {
      this.onChange(value);
    }
  
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if(!this.selectedOption)
    { 
      return {required: true};
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.updateFilteredOptions();
    }
  }

  ngOnInit(): void {
    this.selectedOption = this.choiceOption;
  }

  ngAfterViewInit(): void {
    const input = this.inputInside.nativeElement as HTMLInputElement;
    if (this.placeholder) {
      input.placeholder = this.placeholder;
    }
    if (this.selectedOption) {
      input.value = this.selectedOption;
    }
  }

  updateFilteredOptions(): void {
    if (this.options && this.options.length > 0) {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = [];
    }
    if(this.choiceOption === '')
    {
      if (this.inputInside && this.inputInside.nativeElement) {
        const input = this.inputInside.nativeElement as HTMLInputElement;
        input.value = '';
      }
    }
   
  }

  filterChange(event: any) {
    const value = event?.value || '';
    this.filterOptions();
    if(this.onChange)
    { 
      this.onChange(value);
    }
  }

  filterOptions(): void {
    const input = this.inputInside.nativeElement as HTMLInputElement;
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
    const input = this.inputInside.nativeElement as HTMLInputElement;
    input.value = option.name;
    this.selectedOption = option.name;
    this.filterOptions();
    this.selectedOptionChange.emit({ data: option, type: this.type });
    this.emitChange(option.name);
  }

  clearSelectedOption(): void {
    const input = this.inputInside.nativeElement as HTMLInputElement;
    input.value = '';
    this.selectedOption = '';
    this.filterOptions();
    this.selectedOptionChange.emit({
      data: { id: '', name: '' },
      type: this.type,
    });
    this.emitChange('');
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      setTimeout(() => {
        this.isDropdownVisible = false;
        this.onComponentClick.emit(false);
      });
    } else {
      this.onComponentClick.emit(true);
    }
  }
}
