import { Component, computed, input } from '@angular/core';
import { ExtendedVehicle } from '../../../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Component({
  selector: 'app-owner-card',
  templateUrl: './owner-card.component.html',
})
export class OwnerCardComponent {
  vehicle = input<ExtendedVehicle>();

  owner = computed(() => {
    return (
      this.vehicle()?.ownerData.firstName +
      ' ' +
      this.vehicle()?.ownerData.lastName
    );
  });
  location = computed(() => {
    return (
      this.vehicle()?.region +
      ', ' +
      this.vehicle()?.town
    );
  });
}
