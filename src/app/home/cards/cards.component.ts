import { Component, Input } from '@angular/core';
import { Vehicle } from "../../shared/models/vehicle";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() vehicles: Vehicle[] = [];

 constructor () {}
}
