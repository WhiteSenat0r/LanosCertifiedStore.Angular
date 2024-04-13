import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogVehicle } from '../../catalog/models/catalogVehicle';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent{
  @Input() vehicles: CatalogVehicle[] = [];

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
