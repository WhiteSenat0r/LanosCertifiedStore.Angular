import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Brand } from '../../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { inject } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { tap } from 'rxjs';

type BrandModelFilters = {
  brands: Brand[];
  showBrandToolTip: boolean | undefined;
  models: Model[];
  brand: Brand | undefined;
  brandFilterReset: boolean;
  model: Model | undefined;
  modelFilterReset: boolean;
};

const initialState: BrandModelFilters = {
  brands: [],
  showBrandToolTip: undefined,
  models: [],
  brand: undefined,
  brandFilterReset: false,
  model: undefined,
  modelFilterReset: false,
};

export function withBrandModelFilters() {
  return signalStoreFeature(
    withState(initialState),
    withMethods((store, catalogService = inject(CatalogService)) => ({
      loadBrands() {
        return catalogService.getBrands().pipe(
          tap((response) => {
            patchState(store, { brands: response.items });
          })
        );
      },
      changeShowBrandToolTip(showBrandToolTip: boolean) {
        patchState(store, { showBrandToolTip });
      },
      handleAskToLoadModels() {
        if (!store.brand()) {
          patchState(store, { showBrandToolTip: true });
        } else {
          catalogService.getModels(store.brand()!.id).subscribe((response) => {
            patchState(store, { models: response.items });
          });
        }
      },
    })),
  );
}
