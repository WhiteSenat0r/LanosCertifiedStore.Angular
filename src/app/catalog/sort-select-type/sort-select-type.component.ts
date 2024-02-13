import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-select-type',
  templateUrl: './sort-select-type.component.html',
  styleUrls: ['./sort-select-type.component.css']
})
export class SortSelectTypeComponent {
  selectedType: any | null = {name: 'No sorting', value: ''};

  isDropdownVisible = false;

  @Input() types: any[] = [];
  @Output() selectedSortTypeChange: EventEmitter<any | null> =
    new EventEmitter<any | null>();

  constructor(private elementRef: ElementRef) {
    if(this.types.length > 0)
    {
      this.selectedType = this.types[0];
    }
   }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible
  }

  selectType(type: any | null) {
    this.selectedType = type;
    this.selectedSortTypeChange.emit({type})
  }
}
