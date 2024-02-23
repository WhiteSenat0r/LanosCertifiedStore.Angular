import { Component, Input } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle';

@Component({
  selector: 'app-car-item-component',
  templateUrl: './car-item-component.component.html',
  styleUrls: ['./car-item-component.component.css']
})
export class CarItemComponentComponent {

  @Input() vehicle?: Vehicle;
  @Input() columnCount?: number;
}
