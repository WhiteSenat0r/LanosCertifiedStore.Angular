import { Component, Input, output, Output } from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';

@Component({
  selector: 'app-vehicle-data-view',
  templateUrl: './vehicle-data-view.component.html',
  styleUrl: './vehicle-data-view.component.css',
})
export class VehicleDataViewComponent {
  @Input({ required: true }) vehicles!: Vehicle[];
  
  goToProductPage = output<Vehicle>();
  
  handleCardClick(vehicle: Vehicle) {
    this.goToProductPage.emit(vehicle);
  }


}
