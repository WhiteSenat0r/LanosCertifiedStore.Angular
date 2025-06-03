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
import { lastValueFrom, tap } from 'rxjs';
import { CatalogService } from '../../services/catalog.service';

//Util functions
import { updateItemStatusById } from '../../utils/UpdateItemStatusById';
import { SortDirection } from '../../models/enums/SortDirection.enum';

type VehicleFilterState = {
  lowerPrice: number | undefined;
  upperPrice: number | undefined;
  color: VehicleColor | undefined;
  sortingType: SortDirection;
};

const initialFilterState: VehicleFilterState = {
  color: undefined,
  lowerPrice: undefined,
  upperPrice: undefined,
  sortingType: SortDirection.AscPrice,
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
        engineTypeIds: store
          .allEngines()
          .filter((item) => item.status === true),
        drivetrainTypeIds: store
          .allDriveTrains()
          .filter((item) => item.status === true),
        bodyTypeIds: store
          .allBodyTypes()
          .filter((item) => item.status === true),
        transmissionTypeIds: store
          .allTransmissionTypes()
          .filter((item) => item.status === true),
        vTypeIds: store.allVTypes().filter((item) => item.status === true),
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
    handleCallForSortingTypeChange(chosenSorting: SortDirection) {
      patchState(store, { sortingType: chosenSorting });
      vehicleStore.setVehicleSearchCriterias({ sortingType: chosenSorting });
      vehicleStore.loadVehicles();
    },
  })),
  withHooks({
    async onInit(
      store,
      route = inject(ActivatedRoute),
      vehicleStore = inject(VehicleStore),
      catalogService = inject(CatalogService)
    ) {
      await lastValueFrom(store.loadBrands());
      await lastValueFrom(store.loadEngines());
      await lastValueFrom(store.loadDrivetrains());
      await lastValueFrom(store.loadBodyTypes());
      await lastValueFrom(store.loadTransmissionTypes());
      await lastValueFrom(store.loadVTypes());
      // await lastValueFrom(store.loadRegions());
      // await lastValueFrom(store.loadTransmissions());
      route.queryParamMap.subscribe(async (params) => {
        for (let i = 0; i < params.keys.length; i++) {
          const key = params.keys[i];
          const value = params.get(key);
          if (value === null) continue;
          switch (key) {
            case 'highestPrice':
              patchState(store, { upperPrice: Number(value) });
              break;
            case 'brandName':
              const ourBrand = store
                .brands()
                .find((brand) => brand.name === value);
              patchState(store, { brand: ourBrand });
              await lastValueFrom(
                catalogService.getModels(store.brand()!.id).pipe(
                  tap((response) => {
                    patchState(store, { models: response.items });
                  })
                )
              );
              break;
            case 'brandId':
              const brand = store.brands().find((brand) => brand.id === value);
              patchState(store, { brand });
              vehicleStore.setVehicleSearchCriterias({
                brandId: brand?.id,
              });
              await lastValueFrom(
                catalogService.getModels(store.brand()!.id).pipe(
                  tap((response) => {
                    patchState(store, { models: response.items });
                  })
                )
              );
              break;
            case 'modelId':
              const model = store.models().find((model) => model.id === value);
              patchState(store, { model });
              vehicleStore.setVehicleSearchCriterias({
                modelId: model?.id,
              });
              break;
            case 'engineId':
              patchState(store, {
                allEngines: updateItemStatusById(store.allEngines(), value),
              });
              store.updateSearchCriteria('allEngines', 'engineTypeIds');
              break;
            case 'transmissionId':
              patchState(store, {
                allTransmissionTypes: updateItemStatusById(
                  store.allTransmissionTypes(),
                  value
                ),
              });
              store.updateSearchCriteria(
                'allTransmissionTypes',
                'transmissionTypeIds'
              );
              break;
            case 'bodyTypeId':
              patchState(store, {
                allBodyTypes: updateItemStatusById(store.allBodyTypes(), value),
              });
              store.updateSearchCriteria('allBodyTypes', 'bodyTypeIds');
              break;
            case 'drivetrainId':
              patchState(store, {
                allDriveTrains: updateItemStatusById(
                  store.allDriveTrains(),
                  value
                ),
              });
              store.updateSearchCriteria('allDriveTrains', 'drivetrainTypeIds');
              break;
            case 'vTypeId':
              patchState(store, {
                allVTypes: updateItemStatusById(store.allVTypes(), value),
              });
              store.updateSearchCriteria('allVTypes', 'vTypeIds');
              break;
            case 'regionId': {
              const region = store
                .regions()
                .find((region) => region.id === value);
              patchState(store, { region: region });
              vehicleStore.setVehicleSearchCriterias({
                locationRegionId: region?.id,
              });
              break;
            }
            case 'townId': {
              const town = store.towns().find((town) => town.id === value);
              patchState(store, { town: town });
              vehicleStore.setVehicleSearchCriterias({
                locationRegionId: town?.id,
              });
              break;
            }
          }
        }

        vehicleStore.loadVehicles();
        //Reload page with filled values
        // setTimeout(() => {
        //   console.log(store.brand);
        //   vehicleStore.loadVehicles();
        // }, 5000);
      });
    },
  })
);
