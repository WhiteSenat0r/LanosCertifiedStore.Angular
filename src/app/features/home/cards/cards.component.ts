import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListVehicle } from 'src/app/shared/models/ListVehicle';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent{
  @Input() vehicles: ListVehicle[] = [];

  countOfSearch: number = 0;

  @Output() lookMoreEvent: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();
  onButtonClick() {
    if(this.countOfSearch <= 2)
    {
      this.lookMoreEvent.emit(false)
      this.countOfSearch += 1;
    }
    else{
      this.lookMoreEvent.emit(true)
    }
  }
}
