import { computed, effect, inject, model, untracked } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subject, tap } from 'rxjs';
import { CatalogService } from '../../services/catalog.service';

//Util functions
import { updateItemStatusById } from '../../utils/UpdateItemStatusById';
import { SortDirection } from '../../models/enums/SortDirection.enum';
import { LiveBodyType } from '../../models/interfaces/vehicleProperties/LiveBodyType.interface';
import { LiveDrivetrainType } from '../../models/interfaces/vehicleProperties/LiveDrivetrainType.interface';
import { LiveEngineType } from '../../models/interfaces/vehicleProperties/LiveEngineType.interface';
import { LiveTransmissionType } from '../../models/interfaces/vehicleProperties/LiveTransmissionType.interface';
import { LiveVType } from '../../models/interfaces/vehicleProperties/LiveVType.interface';
import { updateItemsStatusByIds } from '../../utils/UpdateItemsStatusByIds';

type VehicleFilterState = {
  lowerPrice: number | undefined;
  upperPrice: number | undefined;
  color: VehicleColor | undefined;
  sortingType: SortDirection;
  generalReload: boolean;
  highestPricePlug: boolean | null;
  highestPriceUrlInit: number | undefined;

  //
  sortingTypeChanging: boolean;
};

const initialFilterState: VehicleFilterState = {
  color: undefined,
  lowerPrice: undefined,
  upperPrice: undefined,
  sortingType: SortDirection.AscPrice,
  generalReload: false,
  highestPricePlug: false,
  highestPriceUrlInit: undefined,
  sortingTypeChanging: false,
};

const priceRangeInitialized$ = new Subject<void>();

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
  withMethods(
    (
      store,
      vehicleStore = inject(VehicleStore),
      router = inject(Router),
      route = inject(ActivatedRoute)
    ) => ({
      _updateQueryParams(params: Record<string, any>): void {
        router.navigate([], {
          relativeTo: route,
          queryParams: params,
          queryParamsHandling: 'merge',
        });
      },
      setColor(color: VehicleColor) {
        patchState(store, { color });
        vehicleStore.setVehicleSearchCriterias({ colorId: color.id });
        this._updateQueryParams({ colorId: color.id });
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

            this._updateQueryParams({
              brandId: undefined,
              modelId: undefined,
              brand: undefined,
              model: undefined,
            });
            break;
          }
          case FilterProperty.Model: {
            patchState(store, { model: undefined });
            patchState(store, { modelFilterReset: true });
            vehicleStore.setVehicleSearchCriterias({ modelId: '' });

            this._updateQueryParams({ modelId: undefined, model: undefined });
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

            this._updateQueryParams({
              locationRegionId: undefined,
              locationRegion: undefined,
              townId: undefined,
              town: undefined,
            });
            break;
          }
          case FilterProperty.Town: {
            patchState(store, { town: undefined });
            patchState(store, { townFilterReset: true });
            vehicleStore.setVehicleSearchCriterias({ townId: '' });

            this._updateQueryParams({ townId: undefined, town: undefined });
            break;
          }
          case FilterProperty.Color: {
            patchState(store, { color: undefined });
            vehicleStore.setVehicleSearchCriterias({ colorId: '' });
            this._updateQueryParams({ colorId: undefined });
            break;
          }
          case FilterProperty.LowerPrice: {
            patchState(store, { lowerPrice: undefined });
            vehicleStore.setVehicleSearchCriterias({
              lowerPriceLimit: undefined,
            });

            this._updateQueryParams({ lowestPrice: undefined });
            break;
          }
          case FilterProperty.UpperPrice: {
            patchState(store, { upperPrice: undefined });
            vehicleStore.setVehicleSearchCriterias({
              upperPriceLimit: undefined,
            });

            this._updateQueryParams({ highestPrice: undefined });
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
              sortingType: SortDirection.AscPrice,

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
              lowerPriceLimit: 0,
              upperPriceLimit: undefined,
              engineTypeIds: [],
              drivetrainTypeIds: [],
              bodyTypeIds: [],
              transmissionTypeIds: [],
              vTypeIds: [],
              sortingType: SortDirection.AscPrice,
            });

            this._updateQueryParams({
              brandId: undefined,
              modelId: undefined,
              brand: undefined,
              model: undefined,
              locationRegionId: undefined,
              locationRegion: undefined,
              townId: undefined,
              town: undefined,
              colorId: undefined,
              engineTypeIds: undefined,
              drivetrainTypeIds: undefined,
              bodyTypeIds: undefined,
              transmissionTypeIds: undefined,
              vTypeIds: undefined,
              sortingType: undefined,
            });
            break;
          }
        }
        setTimeout(() => {
          this._updateQueryParams({
            lowestPrice: undefined,
            highestPrice: undefined,
          });
        });

        patchState(store, { generalReload: true });
        store.loadPriceRange();
      },
      handleCallForBrandChangeState(brand: Brand) {
        if (brand.id !== store.brand()?.id) {
          patchState(store, { brand });
          vehicleStore.setVehicleSearchCriterias({ brandId: brand.id });
          this._updateQueryParams({ brandId: brand.id, brand: brand.name });

          store.loadPriceRange();
          vehicleStore.loadVehicles();
          patchState(store, { modelFilterReset: true });
          patchState(store, { model: undefined });
          setTimeout(() => {
            this._updateQueryParams({ modelId: undefined, model: undefined });
          });

          store.handleAskToLoadModels();
        }
      },
      handleCallForRegionChangeState(region: LocationRegion) {
        if (region.id !== store.region()?.id) {
          patchState(store, { region });
          vehicleStore.setVehicleSearchCriterias({
            locationRegionId: region.id,
          });
          this._updateQueryParams({
            locationRegionId: region.id,
            locationRegion: region.name,
          });
          store.loadPriceRange();
          vehicleStore.loadVehicles();
          patchState(store, { townFilterReset: true });
          patchState(store, { town: undefined });
          setTimeout(() => {
            this._updateQueryParams({ townId: undefined, town: undefined });
          });
          store.handleAskToLoadTowns();
        }
      },
      handleCallForModelChangeState(model: Model) {
        if (model.id !== store.model()?.id) {
          patchState(store, { model });
          vehicleStore.setVehicleSearchCriterias({ modelId: model.id });
          this._updateQueryParams({ modelId: model.id, model: model.name });
          store.loadPriceRange();
          vehicleStore.loadVehicles();
        }
      },
      handleCallForTownChangeState(town: LocationTown) {
        if (town.id !== store.town()?.id) {
          patchState(store, { town });
          vehicleStore.setVehicleSearchCriterias({ townId: town.id });
          this._updateQueryParams({ townId: town.id, town: town.name });
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
        const key = Object.keys(SortDirection).find(
          (k) =>
            SortDirection[k as keyof typeof SortDirection] === chosenSorting
        );
        if (key) {
          patchState(store, { sortingTypeChanging: true });
          this._updateQueryParams({ sortingType: key });
        }
        vehicleStore.loadVehicles();
      },
      handleCheckboxChanged(event: {
        item:
          | LiveBodyType
          | LiveEngineType
          | LiveDrivetrainType
          | LiveVType
          | LiveTransmissionType;
        filterType: string;
      }) {
        const { item, filterType } = event;

        // Визначаємо параметр query для кожного типу
        let queryParam = '';
        let stateKey = '';

        switch (filterType) {
          case 'Тип двигуна':
            queryParam = 'engineTypeIds';
            stateKey = 'allEngines';
            break;
          case 'Тип приводу':
            queryParam = 'drivetrainTypeIds';
            stateKey = 'allDriveTrains';
            break;
          case 'Тип кузова':
            queryParam = 'bodyTypeIds';
            stateKey = 'allBodyTypes';
            break;
          case 'Тип трансмісії':
            queryParam = 'transmissionTypeIds';
            stateKey = 'allTransmissionTypes';
            break;
          case 'Тип транспортного засобу':
            queryParam = 'vTypeIds';
            stateKey = 'allVTypes';
            break;
        }

        if (!queryParam || !stateKey) return;

        if (item.status === true) {
          // Встановлюємо статус true, якщо він ще не true
          const updated = (store as any)
            [stateKey]()
            .map((i: any) =>
              i.id === item.id && i.status !== true ? { ...i, status: true } : i
            );
          patchState(store, { [stateKey]: updated });

          // Додаємо id до query param
          this._addIdToQueryParam(queryParam, item.id);
        } else {
          // Встановлюємо статус false
          const updated = (store as any)().map((i: any) =>
            i.id === item.id ? { ...i, status: false } : i
          );
          patchState(store, { [stateKey]: updated });

          // Видаляємо id з query param
          this._removeIdFromQueryParam(queryParam, item.id);
        }

        store.updateSearchCriteria('allEngines', 'engineTypeIds');
        store.updateSearchCriteria('allDriveTrains', 'drivetrainTypeIds');
        store.updateSearchCriteria('allBodyTypes', 'bodyTypeIds');
        store.updateSearchCriteria(
          'allTransmissionTypes',
          'transmissionTypeIds'
        );
        store.updateSearchCriteria('allVTypes', 'vTypeIds');
        patchState(store, { generalReload: true });
        store.loadPriceRange();
      },
      _addIdToQueryParam(param: string, id: string): void {
        const current = route.snapshot.queryParamMap.get(param);
        const ids = current ? current.split(',') : [];

        if (!ids.includes(id)) {
          ids.push(id);
          this._updateQueryParams({ [param]: ids.join(',') });
        }
      },
      _removeIdFromQueryParam(param: string, id: string): void {
        const current = route.snapshot.queryParamMap.get(param);
        const ids = current ? current.split(',') : [];

        const filtered = ids.filter((existingId) => existingId !== id);
        this._updateQueryParams({
          [param]: filtered.length ? filtered.join(',') : null,
        });
      },
      deleteEntryFromCheckbox(entry: {
        id: string;
        name: string;
        status?: boolean;
      }) {
        if (entry.status) {
          // --- Engines
          const updatedEngines = store.allEngines().map((engine) => {
            if (engine.id === entry.id) {
              this._removeIdFromQueryParam('engineTypeIds', entry.id);
              return { ...engine, status: false };
            }
            return engine;
          });
          patchState(store, { allEngines: updatedEngines });

          // --- Drivetrain Types
          const updatedDrivetrains = store.allDriveTrains().map((dt) => {
            if (dt.id === entry.id) {
              this._removeIdFromQueryParam('drivetrainTypeIds', entry.id);
              return { ...dt, status: false };
            }
            return dt;
          });
          patchState(store, { allDriveTrains: updatedDrivetrains });

          // --- Body Types
          const updatedBodyTypes = store.allBodyTypes().map((bt) => {
            if (bt.id === entry.id) {
              this._removeIdFromQueryParam('bodyTypeIds', entry.id);
              return { ...bt, status: false };
            }
            return bt;
          });
          patchState(store, { allBodyTypes: updatedBodyTypes });

          // --- Transmission Types
          const updatedTransmissions = store
            .allTransmissionTypes()
            .map((tt) => {
              if (tt.id === entry.id) {
                this._removeIdFromQueryParam('transmissionTypeIds', entry.id);
                return { ...tt, status: false };
              }
              return tt;
            });
          patchState(store, { allTransmissionTypes: updatedTransmissions });

          // --- VTypes
          const updatedVTypes = store.allVTypes().map((vt) => {
            if (vt.id === entry.id) {
              this._removeIdFromQueryParam('vTypeIds', entry.id);
              return { ...vt, status: false };
            }
            return vt;
          });
          patchState(store, { allVTypes: updatedVTypes });
        }

        store.updateSearchCriteria('allEngines', 'engineTypeIds');
        store.updateSearchCriteria('allDriveTrains', 'drivetrainTypeIds');
        store.updateSearchCriteria('allBodyTypes', 'bodyTypeIds');
        store.updateSearchCriteria(
          'allTransmissionTypes',
          'transmissionTypeIds'
        );
        store.updateSearchCriteria('allVTypes', 'vTypeIds');
        patchState(store, { generalReload: true });
        store.loadPriceRange();
      },
    })
  ),
  withHooks({
    async onInit(
      store,
      route = inject(ActivatedRoute),
      vehicleStore = inject(VehicleStore),
      catalogService = inject(CatalogService)
    ) {
      effect(() => {
        if (store.priceRange()) {
          untracked(() => {
            // to lowerPrice
            patchState(store, { lowerPrice: store.priceRange().lowest });
            vehicleStore.setVehicleSearchCriterias({
              lowerPriceLimit: store.lowerPrice(),
            });
            // to upperPrice
            if (!store.highestPricePlug()) {
              patchState(store, { upperPrice: store.priceRange().highest });
            } else {
              if (
                store.highestPriceUrlInit() !== undefined &&
                Number(store.highestPriceUrlInit()) <
                  store.priceRange().highest &&
                Number(store.highestPriceUrlInit()) > store.priceRange().lowest
              ) {
                patchState(store, {
                  upperPrice: Number(store.highestPriceUrlInit()),
                });
              } else {
                patchState(store, { upperPrice: store.priceRange().highest });
              }
              patchState(store, { highestPricePlug: null });
              patchState(store, { highestPriceUrlInit: undefined });
            }
            vehicleStore.setVehicleSearchCriterias({
              upperPriceLimit: store.upperPrice(),
            });

            //other conditions
            if (store.generalReload()) {
              vehicleStore.loadVehicles();
              patchState(store, { generalReload: false });
            }
          });
        }
      });
      await lastValueFrom(store.loadBrands());
      await lastValueFrom(store.loadEngines());
      await lastValueFrom(store.loadDrivetrains());
      await lastValueFrom(store.loadBodyTypes());
      await lastValueFrom(store.loadTransmissionTypes());
      await lastValueFrom(store.loadVTypes());
      await lastValueFrom(store.loadRegions());
      route.queryParamMap.subscribe(async (params) => {
        for (let i = 0; i < params.keys.length; i++) {
          const key = params.keys[i];
          const value = params.get(key);
          if (value === null) continue;
          switch (key) {
            case 'highestPrice':
              if (store.highestPricePlug() !== null) {
                patchState(store, { highestPriceUrlInit: Number(value) });
                patchState(store, { highestPricePlug: true });
              }
              break;
            case 'colorId':
              const ourColor = store
                .colors()
                .find((color) => color.id === value);
              patchState(store, { color: ourColor });
              vehicleStore.setVehicleSearchCriterias({
                colorId: ourColor?.id,
              });
              break;
            case 'sortingType':
              const enumValue =
                SortDirection[value as keyof typeof SortDirection];
              patchState(store, { sortingType: enumValue });
              break;
            case 'brand':
              const ourBrand = store
                .brands()
                .find((brand) => brand.name === value);
              patchState(store, { brand: ourBrand });
              vehicleStore.setVehicleSearchCriterias({
                brandId: ourBrand?.id,
              });
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
            case 'locationRegionId': {
              const region = store
                .regions()
                .find((region) => region.id === value);
              patchState(store, { region: region });
              vehicleStore.setVehicleSearchCriterias({
                locationRegionId: region?.id,
              });
              await lastValueFrom(
                catalogService.getTowns(store.region()!.id).pipe(
                  tap((response) => {
                    patchState(store, { towns: response.items });
                  })
                )
              );
              break;
            }
            case 'modelId':
              const model = store.models().find((model) => model.id === value);
              patchState(store, { model });
              vehicleStore.setVehicleSearchCriterias({
                modelId: model?.id,
              });
              break;
            case 'townId': {
              const town = store.towns().find((town) => town.id === value);
              patchState(store, { town });
              vehicleStore.setVehicleSearchCriterias({
                townId: town?.id,
              });
              break;
            }
            case 'engineTypeIds':
              patchState(store, {
                allEngines: updateItemsStatusByIds(store.allEngines(), value),
              });
              store.updateSearchCriteria('allEngines', 'engineTypeIds');
              break;
            case 'transmissionTypeIds':
              patchState(store, {
                allTransmissionTypes: updateItemsStatusByIds(
                  store.allTransmissionTypes(),
                  value
                ),
              });
              store.updateSearchCriteria(
                'allTransmissionTypes',
                'transmissionTypeIds'
              );
              break;
            case 'bodyTypeIds':
              patchState(store, {
                allBodyTypes: updateItemsStatusByIds(
                  store.allBodyTypes(),
                  value
                ),
              });
              store.updateSearchCriteria('allBodyTypes', 'bodyTypeIds');
              break;
            case 'drivetrainTypeIds':
              patchState(store, {
                allDriveTrains: updateItemsStatusByIds(
                  store.allDriveTrains(),
                  value
                ),
              });
              store.updateSearchCriteria('allDriveTrains', 'drivetrainTypeIds');
              break;
            case 'vTypeIds':
              patchState(store, {
                allVTypes: updateItemStatusById(store.allVTypes(), value),
              });
              store.updateSearchCriteria('allVTypes', 'vTypeIds');
              break;
          }
        }

        if (store.sortingTypeChanging() === false) {
          patchState(store, { generalReload: true });
          store.loadPriceRange();
        } else {
          patchState(store, { sortingTypeChanging: false });
        }
      });
    },
  })
);
