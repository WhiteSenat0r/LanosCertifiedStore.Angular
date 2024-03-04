import { Component, Input } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicle';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent {
  @Input() vehicle!: Vehicle;
}
