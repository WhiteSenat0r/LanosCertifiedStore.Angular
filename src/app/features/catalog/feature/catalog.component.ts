import { Component, inject } from '@angular/core';
import { Vehicle } from '../../../shared/models/BaseApiModels/Vehicle';
import { VehicleStore } from '../stores/vehicles.store';
import { VehicleSearchCriterias } from '../models/VehicleSearchCriterias';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  providers: [VehicleStore],
})
export class CatalogComponent {
  private vehicleSearchCriterias: VehicleSearchCriterias = new VehicleSearchCriterias();
  readonly store = inject(VehicleStore);

  ngOnInit(): void {
    this.store.loadVehicles();
    this.store.loadVehicleCount();
  }

  handlePageChangeEvent(pageIndex: number){
    this.vehicleSearchCriterias.pageIndex = pageIndex;
    this.store.loadVehicles(this.vehicleSearchCriterias);
  }
}
