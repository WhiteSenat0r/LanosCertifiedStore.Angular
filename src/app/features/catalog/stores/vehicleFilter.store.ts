import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CatalogService } from '../services/catalog.service';
import { VehicleColor } from '../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { PriceRange } from '../../home/models/interfaces/PriceRange.interface';
import { VehicleStore } from './vehicles.store';
import { Brand } from '../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { Currency } from '../models/enums/Currency.enum';
import { EngineType } from '../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { DrivetrainType } from '../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { BodyType } from '../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { FilterType } from '../models/enums/FilterType.enum';

type VehicleFilterState = {
  priceRange: PriceRange;
  colors: VehicleColor[];
  brands: Brand[];
  showBrandToolTip: boolean | undefined;
  models: Model[];
  currencyType: string;
  currencyArray: Currency[];
  brand: Brand | undefined;
  model: Model | undefined;
  modelFilterReset: boolean;

  // Related to UI checkbox filters
  engines: EngineType[];
  engine: EngineType | undefined;
  driveTrains: DrivetrainType[];
  driveTrain: DrivetrainType[] | undefined;
  bodyTypes: BodyType[];
  bodyType: BodyType[] | undefined;
};

const initialFilterState: VehicleFilterState = {
  priceRange: { lowest: 0, highest: 100 },
  colors: [],
  brands: [],
  showBrandToolTip: undefined,
  models: [],
  currencyType: Currency.USD,
  currencyArray: [Currency.USD, Currency.EUR, Currency.UA],
  brand: undefined,
  model: undefined,
  modelFilterReset: false,
  engines: [],
  engine: undefined,
  driveTrains: [],
  driveTrain: undefined,
  bodyTypes: [],
  bodyType: undefined,
};

export const VehicleFilterStore = signalStore(
  withState(initialFilterState),
  withMethods(
    (
      store,
      catalogService = inject(CatalogService),
      vehicleStore = inject(VehicleStore)
    ) => ({
      loadAvailableColors() {
        catalogService.getVehicleColors().subscribe((response) => {
          patchState(store, { colors: response.items });
        });
      },
      loadPriceRange() {
        catalogService
          .getPriceRanges(vehicleStore.vehicleSearchCriterias())
          .subscribe((response) => {
            patchState(store, { priceRange: response });
          });
      },
      loadBrands() {
        catalogService.getBrands().subscribe((response) => {
          patchState(store, { brands: response.items });
        });
      },
      changeCurrencyTypeState(newCurrencyType: string) {
        patchState(store, { currencyType: newCurrencyType });
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
      changeShowBrandToolTip(showBrandToolTip: boolean) {
        patchState(store, { showBrandToolTip });
      },
      handleCallForBrandChangeState(brand: Brand) {
        if (brand.id !== store.brand()?.id) {
          patchState(store, { brand });
          vehicleStore.setVehicleSearchCriterias({ brandId: brand.id });
          vehicleStore.loadVehicles();
          patchState(store, { modelFilterReset: true });
          this.handleAskToLoadModels();
        }
      },
      handleCallForModelChangeState(model: Model) {
        if (model.id !== store.model()?.id) {
          patchState(store, { model });
          vehicleStore.setVehicleSearchCriterias({ modelId: model.id });
          vehicleStore.loadVehicles();
        }
      },
      resetDependentFilter(filterType: FilterType) {
        if (filterType === FilterType.modelFilter) {
          patchState(store, { modelFilterReset: false });
        } else if (filterType === FilterType.cityFilter) {
          // TODO: Implement reset logic for cityFilter
        }
      },
    })
  ),
  withHooks({
    onInit(store) {
      store.loadAvailableColors();
      store.loadPriceRange();
      store.loadBrands();
    },
  })
);
