import { Vehicle } from '../../../shared/models/BaseApiModels/Vehicle';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CatalogService } from '../services/catalog.service';
import { inject } from '@angular/core';
import { PaginatedResult } from '../models/PaginatedResult';
import { VehicleSearchCriterias } from '../models/VehicleSearchCriterias';
import { VehicleCountSummary } from '../models/VehicleCountSummary';
type VehicleState = {
  vehicles: Vehicle[];
  currentPageItemsQuantity: number;
  pageIndex: number;
  filteredTotalVehicleCount: number;
};

const initialState: VehicleState = {
  vehicles: [],
  currentPageItemsQuantity: 10,
  pageIndex: 1,
  filteredTotalVehicleCount: 10,
};

export const VehicleStore = signalStore(
  withState(initialState),
  withMethods((store, catalogService = inject(CatalogService)) => ({
    loadVehicles(vehicleSearchCriterias?: VehicleSearchCriterias) {
      catalogService.getVehicles(vehicleSearchCriterias).subscribe({
        next: (response: PaginatedResult<Vehicle>) => {
          patchState(store, {
            vehicles: response.items,
            pageIndex: response.pageIndex,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    },
    loadVehicleCount(vehicleSearchCriterias?: VehicleSearchCriterias) {
      catalogService.getVehicleCountSummary(vehicleSearchCriterias).subscribe({
        next: (response: VehicleCountSummary) => {
          patchState(store, {
              filteredTotalVehicleCount: response.filteredItemsCount
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    },
  }))
);
