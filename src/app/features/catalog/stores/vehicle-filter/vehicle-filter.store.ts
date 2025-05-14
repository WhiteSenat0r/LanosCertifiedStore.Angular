import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { VehicleColor } from '../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { Brand } from '../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { FilterType } from '../../models/enums/FilterType.enum';
import { LocationRegion } from '../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';
import { VehicleInfoOptions } from '../../models/interfaces/VehicleInfoOptions.interface';
import { VehicleStore } from '../vehicles/vehicles.store';
import { withBrandModelFilters } from './custom-store-features/withBrandModelFilters.custom-store-feature';
import { withOtherFilterValuesState } from './custom-store-features/withOtherFilterValues.custom-store-feature';
import { withRegionTownFilters } from './custom-store-features/withRegionTownFilters.custom-store-feature';
import { withPriceRange } from './custom-store-features/withPriceRange.custom-store-feature';
import { withCustomCurrency } from './custom-store-features/withCustomCurrency.custom-store-features';
import { FilterProperty } from '../../models/enums/FilterProperty';
import { VehicleInfoArrays } from '../../models/interfaces/VehicleInfoArrays.interface';
import { ActivatedRoute } from '@angular/router';

type VehicleFilterState = {
  lowerPrice: number | undefined;
  upperPrice: number | undefined;
  color: VehicleColor | undefined;
};

const initialFilterState: VehicleFilterState = {
  color: undefined,
  lowerPrice: undefined,
  upperPrice: undefined,
};

export const VehicleFilterStore = signalStore(
  withState(initialFilterState),
  withBrandModelFilters(),
  withOtherFilterValuesState(),
  withRegionTownFilters(),
  withPriceRange(),
  withCustomCurrency(),
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
    vehicleInfoArrayOptions: computed<VehicleInfoArrays>(() => {
      return {
        engineTypeIds: store.chosenEngines(),
        drivetrainTypeIds: store.chosenDriveTrains(),
        bodyTypeIds: store.chosenBodyTypes(),
        transmissionTypeIds: store.chosenTransmissionTypes(),
        vTypeIds: store.chosenVTypes(),
      };
    }),
  })),
  withMethods((store, vehicleStore = inject(VehicleStore)) => ({
    setColor(color: VehicleColor) {
      patchState(store, { color });
      store.loadPriceRange();
    },
    setPropertyStateToDefault(propertyName: string): void {
      switch (propertyName) {
        case FilterProperty.Brand: {
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
        case FilterProperty.Model: {
          patchState(store, { model: undefined });
          patchState(store, { modelFilterReset: true });
          vehicleStore.setVehicleSearchCriterias({ modelId: '' });
          break;
        }
        case FilterProperty.Region: {
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
        case FilterProperty.Town: {
          patchState(store, { town: undefined });
          patchState(store, { townFilterReset: true });
          vehicleStore.setVehicleSearchCriterias({ townId: '' });
          break;
        }
        case FilterProperty.Color: {
          patchState(store, { color: undefined });
          vehicleStore.setVehicleSearchCriterias({ colorId: '' });
          break;
        }
        case FilterProperty.LowerPrice: {
          patchState(store, { lowerPrice: undefined });
          vehicleStore.setVehicleSearchCriterias({
            lowerPriceLimit: undefined,
          });
          break;
        }
        case FilterProperty.UpperPrice: {
          patchState(store, { upperPrice: undefined });
          vehicleStore.setVehicleSearchCriterias({
            upperPriceLimit: undefined,
          });
          break;
        }
        case FilterProperty.EraseAll: {
          patchState(store, {
            brand: undefined,
            model: undefined,
            region: undefined,
            town: undefined,
            color: undefined,
            lowerPrice: undefined,
            upperPrice: undefined,
            townFilterReset: true,
            regionFilterReset: true,
            modelFilterReset: true,
            brandFilterReset: true,

            // Очистити обрані фільтри
            chosenEngines: [],
            chosenDriveTrains: [],
            chosenBodyTypes: [],
            chosenTransmissionTypes: [],
            chosenVTypes: [],

            // Обнулити status у всіх доступних фільтрах
            allEngines: store
              .allEngines()
              .map((item) => ({ ...item, status: undefined })),
            allDriveTrains: store
              .allDriveTrains()
              .map((item) => ({ ...item, status: undefined })),
            allBodyTypes: store
              .allBodyTypes()
              .map((item) => ({ ...item, status: undefined })),
            allTransmissionTypes: store
              .allTransmissionTypes()
              .map((item) => ({ ...item, status: undefined })),
            allVTypes: store
              .allVTypes()
              .map((item) => ({ ...item, status: undefined })),
          });

          vehicleStore.setVehicleSearchCriterias({
            brandId: '',
            modelId: '',
            locationRegionId: '',
            townId: '',
            colorId: '',
            lowerPriceLimit: undefined,
            upperPriceLimit: undefined,

            // Очистити фільтри за id
            engineTypeIds: [],
            drivetrainTypeIds: [],
            bodyTypeIds: [],
            transmissionTypeIds: [],
            vTypeIds: [],
          });

          vehicleStore.loadVehicles();
          break;
        }
      }
      store.loadPriceRange();
      vehicleStore.loadVehicles();
    },
    handleCallForBrandChangeState(brand: Brand) {
      if (brand.id !== store.brand()?.id) {
        patchState(store, { brand });
        vehicleStore.setVehicleSearchCriterias({ brandId: brand.id });
        store.loadPriceRange();
        vehicleStore.loadVehicles();
        patchState(store, { modelFilterReset: true });
        patchState(store, { model: undefined });
        store.handleAskToLoadModels();
      }
    },
    handleCallForRegionChangeState(region: LocationRegion) {
      if (region.id !== store.region()?.id) {
        patchState(store, { region });
        vehicleStore.setVehicleSearchCriterias({
          locationRegionId: region.id,
        });
        store.loadPriceRange();
        vehicleStore.loadVehicles();
        patchState(store, { townFilterReset: true });
        patchState(store, { town: undefined });
        store.handleAskToLoadTowns();
      }
    },
    handleCallForModelChangeState(model: Model) {
      if (model.id !== store.model()?.id) {
        patchState(store, { model });
        vehicleStore.setVehicleSearchCriterias({ modelId: model.id });
        store.loadPriceRange();
        vehicleStore.loadVehicles();
      }
    },
    handleCallForTownChangeState(town: LocationTown) {
      if (town.id !== store.town()?.id) {
        patchState(store, { town });
        vehicleStore.setVehicleSearchCriterias({ townId: town.id });
        store.loadPriceRange();
        vehicleStore.loadVehicles();
      }
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
  })),
  withHooks({
    onInit(
      store,
      route = inject(ActivatedRoute),
      vehicleStore = inject(VehicleStore)
    ) {
      route.queryParamMap.subscribe((params) => {
        params.keys.forEach((key) => {
          const value = params.get(key);
          if (value === null) return;

          switch (key) {
            case 'highestPrice':
              patchState(store, { upperPrice: Number(value) });
              break;
            // Додаткові поля в майбутньому
            // case 'brand':
            //   patchState(store, { brand: value });
            //   break;
          }
        });
      });
    },
  })
);
