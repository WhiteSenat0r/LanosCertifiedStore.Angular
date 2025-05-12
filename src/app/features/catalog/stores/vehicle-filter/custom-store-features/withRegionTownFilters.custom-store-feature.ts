import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { LocationRegion } from '../../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { inject } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';

type RegionTownFilters = {
  regions: LocationRegion[];
  towns: LocationTown[];
  region: LocationRegion | undefined;
  regionFilterReset: boolean;
  town: LocationTown | undefined;
  showRegionToolTip: boolean | undefined;
  townFilterReset: boolean;
};

const initialState: RegionTownFilters = {
  regions: [],
  towns: [],
  region: undefined,
  regionFilterReset: false,
  town: undefined,
  showRegionToolTip: undefined,
  townFilterReset: false,
};

export function withRegionTownFilters() {
  return signalStoreFeature(
    withState(initialState),
    withMethods((store, catalogService = inject(CatalogService)) => ({
      loadRegions() {
        catalogService.getRegions().subscribe((response) => {
          patchState(store, { regions: response.items });
        });
      },
      changeShowRegionToolTip(showRegionToolTip: boolean) {
        patchState(store, { showRegionToolTip });
      },
      handleAskToLoadTowns() {
        if (!store.region()) {
          patchState(store, { showRegionToolTip: true });
        } else {
          catalogService.getTowns(store.region()!.id).subscribe((response) => {
            patchState(store, { towns: response.items });
          });
        }
      },
    })),
    withHooks({
      onInit(store) {
        store.loadRegions();
      },
    })
  );
}
