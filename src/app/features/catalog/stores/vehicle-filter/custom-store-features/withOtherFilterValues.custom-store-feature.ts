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
import { BodyType } from '../../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { DrivetrainType } from '../../../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { EngineType } from '../../../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { TransmissionType } from '../../../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VType } from '../../../../../shared/models/interfaces/vehicle-properties/VType.interface';
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
        deleteEntryFromCheckbox(entry: {
          id: string;
          name: string;
          status?: boolean;
        }) {
          // --- Engines
          if (entry.status) {
            const updatedAll = store
              .allEngines()
              .map((engine) =>
                engine.id === entry.id ? { ...engine, status: false } : engine
              );
            patchState(store, { allEngines: updatedAll });
          }
          // --- Drivetrain Types

          if (entry.status) {
            const updatedAll = store
              .allDriveTrains()
              .map((dt) =>
                dt.id === entry.id ? { ...dt, status: false } : dt
              );
            patchState(store, { allDriveTrains: updatedAll });
          }

          // --- Body Types
          if (entry.status) {
            const updatedAll = store
              .allBodyTypes()
              .map((bt) =>
                bt.id === entry.id ? { ...bt, status: false } : bt
              );
            patchState(store, { allBodyTypes: updatedAll });
          }

          // --- Transmission Types
          if (entry.status) {
            const updatedAll = store
              .allTransmissionTypes()
              .map((tt) =>
                tt.id === entry.id ? { ...tt, status: false } : tt
              );
            patchState(store, { allTransmissionTypes: updatedAll });
          }
          // --- VTypes
          if (entry.status) {
            const updatedAll = store
              .allVTypes()
              .map((vt) =>
                vt.id === entry.id ? { ...vt, status: false } : vt
              );
            patchState(store, { allVTypes: updatedAll });
          }

          this.updateSearchCriteria('allEngines', 'engineTypeIds');
          this.updateSearchCriteria('allDriveTrains', 'drivetrainTypeIds');
          this.updateSearchCriteria('allBodyTypes', 'bodyTypeIds');
          this.updateSearchCriteria(
            'allTransmissionTypes',
            'transmissionTypeIds'
          );
          this.updateSearchCriteria('allVTypes', 'vTypeIds');
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
          if (event.item.status === true) {
            if (event.filterType === 'Тип двигуна') {
              const updatedEngines = store
                .allEngines()
                .map((i) =>
                  i.id === event.item.id && i.status !== true
                    ? { ...i, status: true }
                    : i
                );
              patchState(store, { allEngines: updatedEngines });
            } else if (event.filterType === 'Тип приводу') {
              const updated = store
                .allDriveTrains()
                .map((i) =>
                  i.id === event.item.id && i.status !== true
                    ? { ...i, status: true }
                    : i
                );
              patchState(store, { allDriveTrains: updated });
            } else if (event.filterType === 'Тип кузова') {
              const updated = store
                .allBodyTypes()
                .map((i) =>
                  i.id === event.item.id && i.status !== true
                    ? { ...i, status: true }
                    : i
                );
              patchState(store, { allBodyTypes: updated });
            } else if (event.filterType === 'Тип трансмісії') {
              const updated = store
                .allTransmissionTypes()
                .map((i) =>
                  i.id === event.item.id && i.status !== true
                    ? { ...i, status: true }
                    : i
                );
              patchState(store, { allTransmissionTypes: updated });
            } else if (event.filterType === 'Тип транспортного засобу') {
              const updated = store
                .allVTypes()
                .map((i) =>
                  i.id === event.item.id && i.status !== true
                    ? { ...i, status: true }
                    : i
                );
              patchState(store, { allVTypes: updated });
            }
          } else {
            if (event.filterType === 'Тип двигуна') {
              const updatedEngines = store
                .allEngines()
                .map((i) =>
                  i.id === event.item.id ? { ...i, status: false } : i
                );
              patchState(store, { allEngines: updatedEngines });
            } else if (event.filterType === 'Тип приводу') {
              const updated = store
                .allDriveTrains()
                .map((i) =>
                  i.id === event.item.id ? { ...i, status: false } : i
                );
              patchState(store, { allDriveTrains: updated });
            } else if (event.filterType === 'Тип кузова') {
              const updated = store
                .allBodyTypes()
                .map((i) =>
                  i.id === event.item.id ? { ...i, status: false } : i
                );
              patchState(store, { allBodyTypes: updated });
            } else if (event.filterType === 'Тип трансмісії') {
              const updated = store
                .allTransmissionTypes()
                .map((i) =>
                  i.id === event.item.id ? { ...i, status: false } : i
                );
              patchState(store, { allTransmissionTypes: updated });
            } else if (event.filterType === 'Тип транспортного засобу') {
              const updated = store
                .allVTypes()
                .map((i) =>
                  i.id === event.item.id ? { ...i, status: false } : i
                );
              patchState(store, { allVTypes: updated });
            }
          }

          this.updateSearchCriteria('allEngines', 'engineTypeIds');
          this.updateSearchCriteria('allDriveTrains', 'drivetrainTypeIds');
          this.updateSearchCriteria('allBodyTypes', 'bodyTypeIds');
          this.updateSearchCriteria(
            'allTransmissionTypes',
            'transmissionTypeIds'
          );
          this.updateSearchCriteria('allVTypes', 'vTypeIds');
          vehicleStore.loadVehicles();
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
