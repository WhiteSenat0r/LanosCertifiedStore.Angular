import { Vehicle } from '../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CatalogService } from '../services/catalog.service';
import { inject } from '@angular/core';
import { PaginatedResult } from '../../../shared/models/interfaces/api/PaginatedResult.interface';
import { VehicleSearchCriterias } from '../models/classes/VehicleSearchCriterias.class';
import { VehicleCountSummary } from '../models/interfaces/VehicleCountSummary.interface';
type VehicleState = {
  vehicles: Vehicle[];
  vehicleSearchCriterias: VehicleSearchCriterias;
  currentPageItemsQuantity: number;
  pageIndex: number;
  filteredTotalVehicleCount: number;
};

const initialState: VehicleState = {
  vehicles: [],
  vehicleSearchCriterias: new VehicleSearchCriterias(),
  currentPageItemsQuantity: 10,
  pageIndex: 1,
  filteredTotalVehicleCount: 0,
};

export const VehicleStore = signalStore(
  withState(initialState),
  withMethods((store, catalogService = inject(CatalogService)) => ({
    loadVehicles() {
      const vehicleSearchCriterias = store.vehicleSearchCriterias();
      this.loadVehicleCount();
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
    loadVehicleCount() {
      const vehicleSearchCriterias = store.vehicleSearchCriterias();
      catalogService.getVehicleCountSummary(vehicleSearchCriterias).subscribe({
        next: (response: VehicleCountSummary) => {
          patchState(store, {
            filteredTotalVehicleCount: response.filteredItemsCount,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    },

    setVehicleSearchCriterias(
      updatedCriteria: Partial<VehicleSearchCriterias>
    ) {
      patchState(store, {
        vehicleSearchCriterias: {
          ...store.vehicleSearchCriterias(),
          ...updatedCriteria,
        },
      });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadVehicles();
    },
    onDestroy(store) {
      patchState(store, {
        vehicles: [],
        filteredTotalVehicleCount: 0,
      });
    },
  })
);
