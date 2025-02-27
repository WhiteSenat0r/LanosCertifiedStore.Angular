import { Component, inject } from '@angular/core';
import { VehicleStore } from '../stores/vehicles.store';
import { VehicleSearchCriterias } from '../models/VehicleSearchCriterias';
import { ViewMode } from '../models/ViewMode.enum';
import { VehicleFilterStore } from '../stores/vehicleFilter.store';
import { VehicleColor } from '../../../shared/models/BaseApiModels/VehicleColor';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  providers: [VehicleStore, VehicleFilterStore],
})
export class CatalogComponent {
  readonly vehicleStore = inject(VehicleStore);
  readonly vehicleFilterStore = inject(VehicleFilterStore);

  ViewMode = ViewMode;
  ourViewMode: ViewMode = ViewMode.grid;
  handleViewModeToggleEvent(option: ViewMode) {
    this.ourViewMode = option;
  }

  handlePageChangeEvent(pageIndex: number) {
    this.vehicleStore.setVehicleSearchCriterias({ pageIndex });
    this.vehicleStore.loadVehicles();
  }

  handleColorChange(color: VehicleColor) {
    this.vehicleStore.setVehicleSearchCriterias({ colorId: color.id });
    this.vehicleFilterStore.loadPriceRange();
    this.vehicleStore.loadVehicles();
  }

  handleMinPriceChange(min: number) {
    this.vehicleStore.setVehicleSearchCriterias({ lowerPriceLimit: min });
    this.vehicleStore.loadVehicles();
  }

  handleMaxPriceChange(max: number) {
    this.vehicleStore.setVehicleSearchCriterias({ upperPriceLimit: max });
    this.vehicleStore.loadVehicles();
  }
}
