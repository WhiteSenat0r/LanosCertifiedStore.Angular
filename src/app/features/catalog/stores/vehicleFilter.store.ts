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
import { TransmissionType } from '../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VType } from '../../../shared/models/interfaces/vehicle-properties/VType.interface';

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
  allEngines: EngineType[];
  chosenEngines: EngineType[];
  allDriveTrains: DrivetrainType[];
  chosenDriveTrains: DrivetrainType[];
  allBodyTypes: BodyType[];
  chosenBodyTypes: BodyType[];
  allTransmissionTypes: TransmissionType[];
  chosenTransmissionTypes: TransmissionType[];
  allVTypes: VType[];
  chosenVTypes: VType[];
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
  allEngines: [],
  chosenEngines: [],
  allDriveTrains: [],
  chosenDriveTrains: [],
  allBodyTypes: [],
  chosenBodyTypes: [],
  allTransmissionTypes: [],
  chosenTransmissionTypes: [],
  allVTypes: [],
  chosenVTypes: [],
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
      loadEngines() {
        catalogService.getEngines().subscribe((response) => {
          patchState(store, { allEngines: response.items });
        });
      },
      loadDrivetrains() {
        catalogService.getDrivetrains().subscribe((response) => {
          patchState(store, { allDriveTrains: response.items });
        });
      },
      loadBodyTypes() {
        catalogService.getBodyTypes().subscribe((response) => {
          patchState(store, { allBodyTypes: response.items });
        });
      },
      loadTransmissionTypes() {
        catalogService.getTranmissionTypes().subscribe((response) => {
          patchState(store, { allTransmissionTypes: response.items });
        });
      },
      loadVTypes() {
        catalogService.getVTypes().subscribe((response) => {
          patchState(store, { allVTypes: response.items });
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
      handleCheckboxChanged(event: {
        item: BodyType | EngineType | DrivetrainType | VType | TransmissionType;
        checked: boolean;
        filterType: string;
      }) {
        if (event.checked) {
          if (event.filterType === 'Тип двигуна') {
            if (!store.chosenBodyTypes().some(item => item.id === event.item.id))
            {
              store.chosenBodyTypes().push(event.item);
              const updatedBodyTypesIds = store.chosenBodyTypes().map(item => {
                return item.id
              });
              vehicleStore.setVehicleSearchCriterias({ bodyTypeIds: updatedBodyTypesIds });
            }
          } 
        } else {
          // else if (event.filterType === 'Тип приводу') {
          // } else if (event.filterType === 'Типу кузова') {
          // } else if (event.filterType === 'Тип трансмісії') {
          // } else if (event.filterType === 'Тип транспортного засобу') {
          // }
        }
        vehicleStore.loadVehicles();
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
      store.loadEngines();
      store.loadDrivetrains();
      store.loadBodyTypes();
      store.loadTransmissionTypes();
      store.loadVTypes();
    },
  })
);
