import { Component, input, output } from '@angular/core';
import { Vehicle } from '../../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';

@Component({
  selector: 'app-list-view-vehicles-option',
  templateUrl: './list-view-vehicles-option.component.html',
})
export class ListViewVehiclesOptionComponent {
  vehicles = input.required<Vehicle[] | undefined>();
  isLoading = input.required<boolean>();

  currentCurrencyHolder = input.required<{ type: string; rates: number[] }>();

  goToProductPage = output<Vehicle>();
  onBookmarkButtonClick = output<string>();

  handleCardClick(vehicle: Vehicle) {
    this.goToProductPage.emit(vehicle);
  }
}
