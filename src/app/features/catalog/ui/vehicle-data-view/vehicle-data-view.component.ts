import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../../shared/models/BaseApiModels/Vehicle';

@Component({
  selector: 'app-vehicle-data-view',
  templateUrl: './vehicle-data-view.component.html',
  styleUrl: './vehicle-data-view.component.css',
})
export class VehicleDataViewComponent {
  @Input({required: true}) vehicles!: Vehicle[];
}
