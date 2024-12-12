import { Vehicle } from '../../../shared/models/BaseApiModels/Vehicle';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CatalogService } from '../services/catalog.service';
import { inject } from '@angular/core';
import { PaginatedResult } from '../models/PaginatedResult';
type VehicleState = {
  vehicles: Vehicle[];
};

const initialState: VehicleState = {
  vehicles: [],
};

export const VehicleStore = signalStore(
  withState(initialState),
  withMethods((store, catalogService = inject(CatalogService)) => ({
    loadVehicles() {
      catalogService.getVehicles().subscribe({
        next: (response: PaginatedResult<Vehicle>) => {
          patchState(store, { vehicles: response.items });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }))
);