import { Component, input } from '@angular/core';
import { ExtendedVehicle } from '../../../../shared/models/classes/vehicle-properties/ExtendedVehicle.class';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  vehicle = input.required<ExtendedVehicle>();
}
