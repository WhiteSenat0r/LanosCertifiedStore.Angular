import { Component, computed, input, OnInit } from '@angular/core';
import { ExtendedVehicle } from '../../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  vehicle = input.required<ExtendedVehicle>();

  vehicleDTO = computed<Partial<ExtendedVehicle>>(() => {
    return {
      brand: this.vehicle().brand,
      model: this.vehicle().model,
      color: this.vehicle().color,
      transmissionType: this.vehicle().transmissionType,
      bodyType: this.vehicle().bodyType,
      displacement: this.vehicle().displacement,
      drivetrainType: this.vehicle().drivetrainType,
      mileage: this.vehicle().mileage,
      vincode: this.vehicle().vincode,
      productionYear: this.vehicle().productionYear,
      type: this.vehicle().type,
      engineType: this.vehicle().engineType
    };
  });
}
