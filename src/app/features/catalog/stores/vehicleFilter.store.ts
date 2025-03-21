import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
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
import { LocationRegion } from '../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { VehicleInfoOptions } from '../models/interfaces/VehicleInfoOptions.interface';

type VehicleFilterState = {
  priceRange: PriceRange;
  lowerPrice: number | undefined;
  upperPrice: number | undefined;
  colors: VehicleColor[];
  color: VehicleColor | undefined;
  currencyType: string;
  currencyArray: Currency[];

  // Brand and model filters
  brands: Brand[];
  showBrandToolTip: boolean | undefined;
  models: Model[];
  brand: Brand | undefined;
  brandFilterReset: boolean;
  model: Model | undefined;
  modelFilterReset: boolean;

  // Related to location filters
  regions: LocationRegion[];
  towns: LocationTown[];
  region: LocationRegion | undefined;
  regionFilterReset: boolean;
  town: LocationTown | undefined;
  showRegionToolTip: boolean | undefined;
  townFilterReset: boolean;

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
  showRegionToolTip: undefined,
  models: [],
  regions: [],
  towns: [],
  currencyType: Currency.USD,
  currencyArray: [Currency.USD, Currency.EUR, Currency.UA],
  brand: undefined,
  model: undefined,
  region: undefined,
  town: undefined,
  brandFilterReset: false,
  modelFilterReset: false,
  townFilterReset: false,
  regionFilterReset: false,
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
  color: undefined,
  lowerPrice: undefined,
  upperPrice: undefined,
};

export const VehicleFilterStore = signalStore(
  withState(initialFilterState),
  withComputed((store) => ({
    vehicleInfoOptions: computed<VehicleInfoOptions>(() => {
      return {
        brand: store.brand(),
        model: store.model(),
        region: store.region(),
        town: store.town(),
        color: store.color(),
        upperPrice: store.upperPrice(),
        lowerPrice: store.lowerPrice(),
      };
    }),
  })),
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
      loadRegions() {
        catalogService.getRegions().subscribe((response) => {
          patchState(store, { regions: response.items });
        });
      },

      setColor(color: VehicleColor) {
        patchState(store, { color });
      },

      setPropertyStateToDefault(propertyName: string): void {
        switch (propertyName) {
          case 'brand': {
            patchState(store, { brand: undefined });
            patchState(store, { brandFilterReset: true });
            patchState(store, { model: undefined });
            patchState(store, { modelFilterReset: true });
            vehicleStore.setVehicleSearchCriterias({
              brandId: '',
              modelId: '',
            });
            break;
          }
          case 'model': {
            patchState(store, { model: undefined });
            patchState(store, { modelFilterReset: true });
            vehicleStore.setVehicleSearchCriterias({ modelId: '' });
            break;
          }
          case 'region': {
            patchState(store, { region: undefined });
            patchState(store, { regionFilterReset: true });
            patchState(store, { town: undefined });
            patchState(store, { townFilterReset: true });
            vehicleStore.setVehicleSearchCriterias({
              locationRegionId: '',
              townId: '',
            });
            break;
          }
          case 'town': {
            patchState(store, { town: undefined });
            patchState(store, { townFilterReset: true });
            vehicleStore.setVehicleSearchCriterias({ townId: '' });
            break;
          }
          case 'color': {
            patchState(store, { color: undefined });
            vehicleStore.setVehicleSearchCriterias({ colorId: '' });
            break;
          }
          case 'lowerPrice': {
            patchState(store, { lowerPrice: undefined });
            vehicleStore.setVehicleSearchCriterias({ lowerPriceLimit: undefined });
            break;
          }
          case 'upperPrice': {
            patchState(store, { upperPrice: undefined });
            vehicleStore.setVehicleSearchCriterias({ upperPriceLimit: undefined });
            break;
          }
          case 'eraseAll': {
            patchState(store, {
              brand: undefined,
              brandFilterReset: true,
              model: undefined,
              modelFilterReset: true,
              region: undefined,
              regionFilterReset: true,
              town: undefined,
              townFilterReset: true,
              color: undefined,
              lowerPrice: undefined,
              upperPrice: undefined,
            });

            vehicleStore.setVehicleSearchCriterias({
              brandId: '',
              modelId: '',
              locationRegionId: '',
              townId: '',
              colorId: '',
            });
            break;
          }
        }

        this.loadPriceRange();
        vehicleStore.loadVehicles();
      },
      changeCurrencyTypeState(newCurrencyType: string) {
        patchState(store, { currencyType: newCurrencyType });
      },
      changeShowBrandToolTip(showBrandToolTip: boolean) {
        patchState(store, { showBrandToolTip });
      },
      changeShowRegionToolTip(showRegionToolTip: boolean) {
        patchState(store, { showRegionToolTip });
      },
      handleCallForBrandChangeState(brand: Brand) {
        if (brand.id !== store.brand()?.id) {
          patchState(store, { brand });
          vehicleStore.setVehicleSearchCriterias({ brandId: brand.id });
          this.loadPriceRange();
          vehicleStore.loadVehicles();
          patchState(store, { modelFilterReset: true });
          patchState(store, { model: undefined });
          this.handleAskToLoadModels();
        }
      },
      handleCallForRegionChangeState(region: LocationRegion) {
        if (region.id !== store.region()?.id) {
          patchState(store, { region });
          vehicleStore.setVehicleSearchCriterias({
            locationRegionId: region.id,
          });
          this.loadPriceRange();
          vehicleStore.loadVehicles();
          patchState(store, { townFilterReset: true });
          patchState(store, { town: undefined });
          this.handleAskToLoadTowns();
        }
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
      handleCallForModelChangeState(model: Model) {
        if (model.id !== store.model()?.id) {
          patchState(store, { model });
          vehicleStore.setVehicleSearchCriterias({ modelId: model.id });
          this.loadPriceRange();
          vehicleStore.loadVehicles();
        }
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
      handleCallForTownChangeState(town: LocationTown) {
        if (town.id !== store.town()?.id) {
          patchState(store, { town });
          vehicleStore.setVehicleSearchCriterias({ townId: town.id });
          this.loadPriceRange();
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
            if (
              !store.chosenBodyTypes().some((item) => item.id === event.item.id)
            ) {
              store.chosenBodyTypes().push(event.item);
              const updatedBodyTypesIds = store
                .chosenBodyTypes()
                .map((item) => {
                  return item.id;
                });
              vehicleStore.setVehicleSearchCriterias({
                bodyTypeIds: updatedBodyTypesIds,
              });
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
        } else if (filterType === FilterType.townFilter) {
          patchState(store, { townFilterReset: false });
        } else if (filterType === FilterType.brandFilter) {
          patchState(store, { brandFilterReset: false });
        } else if (filterType === FilterType.regionFilter) {
          patchState(store, { regionFilterReset: false });
        }
      },
      setLowerPrice(lowerPrice: number | undefined) {
        patchState(store, { lowerPrice });
      },
      setUpperPrice(upperPrice: number | undefined) {
        patchState(store, { upperPrice });
      },
    })
  ),
  withHooks({
    onInit(store) {
      store.loadAvailableColors();
      store.loadPriceRange();
      store.loadBrands();
      store.loadRegions();
      store.loadEngines();
      store.loadDrivetrains();
      store.loadBodyTypes();
      store.loadTransmissionTypes();
      store.loadVTypes();
    },
  })
);
