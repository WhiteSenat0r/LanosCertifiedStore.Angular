import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-change-view-grid',
  templateUrl: './change-view-grid.component.html',
  styleUrls: ['./change-view-grid.component.css']
})
export class ChangeViewGridComponent {
  selectedViewArr: number[] = [2,3,4];

  selectedView: any | null = this.selectedViewArr[1];

  isDropdownVisible = false;
  
  @Output() selectedSortTypeChange: EventEmitter<any | null> =
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

  selectType(view: any | null) {
    this.selectedView = view;
    this.selectedSortTypeChange.emit(view)
  }
}
