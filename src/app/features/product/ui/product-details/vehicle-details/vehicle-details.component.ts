import { Component, input } from '@angular/core';
import { ExtendedVehicle } from '../../../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
})
export class VehicleDetailsComponent {
  vehicleDetails = input<Partial<ExtendedVehicle>>();
}
