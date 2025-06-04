import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { PaginatedResult } from '../../../../shared/models/interfaces/api/PaginatedResult.interface';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { VehicleSearchCriterias } from '../../models/classes/VehicleSearchCriterias.class';
import { VehicleCountSummary } from '../../models/interfaces/VehicleCountSummary.interface';
import { CatalogService } from '../../services/catalog.service';
import { delay, finalize, take, tap } from 'rxjs';
type VehicleState = {
  loading: boolean;
  vehicles: Vehicle[] | undefined;
  vehicleSearchCriterias: VehicleSearchCriterias;
  currentPageItemsQuantity: number;
  pageIndex: number;
  filteredTotalVehicleCount: number;
};

const initialState: VehicleState = {
  loading: false,
  vehicles: undefined,
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
      console.log('times');
      this.loadVehicleCount();
      catalogService
        .getVehicles(vehicleSearchCriterias)
        .pipe(
          tap(() => patchState(store, { loading: true })),
          delay(500),
          finalize(() => patchState(store, { loading: false }))
        )
        .subscribe({
          next: (response: PaginatedResult<Vehicle>) => {
            patchState(store, {
              vehicles: response.items,
              pageIndex: response.pageIndex,
            });
            window.scrollTo(0, 0);
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
  }))
);
