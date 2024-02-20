import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Input() minimalPriceDate: Date = new Date(2001, 1, 1);
  @Output() minimalPriceDateChange: EventEmitter<any | null> = new EventEmitter<any | null>();

  onMinimalDateEnter(event: any)
  {
    const enteredDate: Date = new Date(event.target.value);
    this.minimalPriceDateChange.emit(enteredDate);

    console.log(this.minimalPriceDate);
    console.log(this.minimalPriceDate.getDate());
  }
}
