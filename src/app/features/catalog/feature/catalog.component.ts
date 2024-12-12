import { Component, inject } from '@angular/core';
import { Vehicle } from '../../../shared/models/BaseApiModels/Vehicle';
import { VehicleStore } from '../stores/vehicles.store';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  providers: [VehicleStore]
})
export class CatalogComponent {
  readonly store = inject(VehicleStore);

  ngOnInit(): void {
    this.store.loadVehicles();
  }
}
