import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { VehicleColor } from '../../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';

import { inject } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { VehicleStore } from '../../vehicles/vehicles.store';
import { LiveEngineType } from '../../../models/interfaces/vehicleProperties/LiveEngineType.interface';
import { LiveBodyType } from '../../../models/interfaces/vehicleProperties/LiveBodyType.interface';
import { LiveDrivetrainType } from '../../../models/interfaces/vehicleProperties/LiveDrivetrainType.interface';
import { LiveTransmissionType } from '../../../models/interfaces/vehicleProperties/LiveTransmissionType.interface';
import { LiveVType } from '../../../models/interfaces/vehicleProperties/LiveVType.interface';
import { tap } from 'rxjs';

type OtherFilterValuesState = {
  colors: VehicleColor[];
  allEngines: LiveEngineType[];
  allDriveTrains: LiveDrivetrainType[];
  allBodyTypes: LiveBodyType[];
  allTransmissionTypes: LiveTransmissionType[];
  allVTypes: LiveVType[];
};

export function withOtherFilterValuesState() {
  return signalStoreFeature(
    withState<OtherFilterValuesState>({
      colors: [],
      allEngines: [],
      allDriveTrains: [],
      allBodyTypes: [],
      allTransmissionTypes: [],
      allVTypes: [],
    }),
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
        loadEngines() {
          return catalogService.getEngines().pipe(
            tap((response) => {
              patchState(store, { allEngines: response.items });
            })
          );
        },
        loadDrivetrains() {
          return catalogService.getDrivetrains().pipe(
            tap((response) => {
              patchState(store, { allDriveTrains: response.items });
            })
          );
        },
        loadBodyTypes() {
          return catalogService.getBodyTypes().pipe(
            tap((response) => {
              patchState(store, { allBodyTypes: response.items });
            })
          );
        },
        loadTransmissionTypes() {
          return catalogService.getTranmissionTypes().pipe(
            tap((response) => {
              patchState(store, { allTransmissionTypes: response.items });
            })
          );
        },
        loadVTypes() {
          return catalogService.getVTypes().pipe(
            tap((response) => {
              patchState(store, { allVTypes: response.items });
            })
          );
        },
        updateSearchCriteria(
          storeKey: keyof OtherFilterValuesState,
          criteriaKey: keyof Parameters<
            typeof vehicleStore.setVehicleSearchCriterias
          >[0]
        ) {
          const selectedIds = store[storeKey]()
            .filter((item) => 'status' in item && (item as any).status === true)
            .map((item) => item.id);

          vehicleStore.setVehicleSearchCriterias({
            [criteriaKey]: selectedIds,
          });
    
        },
        
      })
    ),
    withHooks({
      onInit(store) {
        store.loadAvailableColors();
        store.loadEngines();
        store.loadDrivetrains();
        store.loadBodyTypes();
        store.loadTransmissionTypes();
        store.loadVTypes();
      },
    })
  );
}
