import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CatalogService } from '../services/catalog.service';
import { VehicleColor } from '../../../shared/models/BaseApiModels/VehicleColor';
import { PriceRange } from '../../home/models/PriceRange';
import { VehicleStore } from './vehicles.store';

type VehicleFilterState = {
  colors: VehicleColor[];
  priceRange: PriceRange;
};

const initialFilterState: VehicleFilterState = {
  colors: [],
  priceRange: { lowest: 0, highest: 100},
};

export const VehicleFilterStore = signalStore(
  withState(initialFilterState),
  withMethods((store, catalogService = inject(CatalogService), vehicleStore = inject(VehicleStore)) => ({
    loadAvailableColors() {
      catalogService.getVehicleColors().subscribe((response) => {
        patchState(store, { colors: response.items });
      });
    },
    loadPriceRange() {
      catalogService.getPriceRanges(vehicleStore.vehicleSearchCriterias()).subscribe((response) => {
        patchState(store, { priceRange: response });
      });
    },
  })),
  withHooks({
    onInit(store) {
        store.loadAvailableColors();
        store.loadPriceRange();
    },
  })
);
