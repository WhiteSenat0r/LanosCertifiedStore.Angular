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

type VehicleFilterState = {
  colors: VehicleColor[];
};

const initialFilterState: VehicleFilterState = {
  colors: [],
};

export const VehicleFilterStore = signalStore(
  withState(initialFilterState),
  withMethods((store, catalogService = inject(CatalogService)) => ({
    loadAvailableColors() {
      catalogService.getVehicleColors().subscribe((response) => {
        patchState(store, { colors: response.items });
      });
    },
  })),
  withHooks({
    onInit(store) {
        store.loadAvailableColors();
    },
  })
);
