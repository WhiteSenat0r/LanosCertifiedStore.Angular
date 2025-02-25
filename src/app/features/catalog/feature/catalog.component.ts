import { Component, inject } from '@angular/core';
import { VehicleStore } from '../stores/vehicles.store';
import { VehicleSearchCriterias } from '../models/VehicleSearchCriterias';
import { ViewMode } from '../models/ViewMode.enum';
import { VehicleFilterStore } from '../stores/vehicleFilter.store';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  providers: [VehicleStore, VehicleFilterStore],
})
export class CatalogComponent {
  readonly vehicleStore = inject(VehicleStore);
  readonly vehicleFilterStore = inject(VehicleFilterStore);

  handlePageChangeEvent(pageIndex: number) {
    this.vehicleStore.setVehicleSearchCriterias({ pageIndex });
    this.vehicleStore.loadVehicles();
  }

  ViewMode = ViewMode;
  ourViewMode: ViewMode = ViewMode.grid;
  handleViewModeToggleEvent(option: ViewMode) {
    this.ourViewMode = option;
  }
}
