import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PriceRange } from '../../../../home/models/interfaces/PriceRange.interface';
import { CatalogService } from '../../../services/catalog.service';
import { effect, inject } from '@angular/core';
import { VehicleStore } from '../../vehicles/vehicles.store';
import { Observable, tap } from 'rxjs';

export function withPriceRange() {
  return signalStoreFeature(
    withState<{ priceRange: PriceRange }>({
      priceRange: { lowest: 0, highest: 100 },
    }),
    withMethods(
      (
        store,
        catalogService = inject(CatalogService),
        vehicleStore = inject(VehicleStore)
      ) => ({
        loadPriceRange() {
          catalogService
            .getPriceRanges(vehicleStore.vehicleSearchCriterias())
            .subscribe((response) => {
              patchState(store, { priceRange: response });
            });
        },
        loadPriceRangePipe(): Observable<any> {
          return catalogService
            .getPriceRanges(vehicleStore.vehicleSearchCriterias())
            .pipe(
              tap((response) => {
                patchState(store, { priceRange: response });
              })
            );
        },
      })
    ),
  );
}
