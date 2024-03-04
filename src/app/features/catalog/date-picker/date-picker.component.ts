import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Input() minimalPriceDate!: Date;
  @Output() minimalPriceDateChange: EventEmitter<any | null> = new EventEmitter<any | null>();

  onMinimalDatePick(event: Date)
  {
    const enteredDate: Date = new Date(event);
    this.minimalPriceDateChange.emit(enteredDate);
  }

  get InputShow() {
    if (this.minimalPriceDate) {
      const dateString = this.minimalPriceDate.getDate() +
        '/' +
        (this.minimalPriceDate.getMonth() + 1) +
        '/' +
        this.minimalPriceDate.getFullYear();
      return dateString === '1/2/2001' ? '' : dateString;
    } else {
      return '';
    }
  }
}
