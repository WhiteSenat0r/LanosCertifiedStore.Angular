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

type OtherFilterValuesState = {
  colors: VehicleColor[];
  allEngines: LiveEngineType[];
  allDriveTrains: LiveDrivetrainType[];
  allBodyTypes: LiveBodyType[];
  allTransmissionTypes: LiveTransmissionType[];
  allVTypes: LiveVType[];

  // Related to UI checkbox filters
  chosenEngines: LiveEngineType[];
  chosenDriveTrains: LiveDrivetrainType[];
  chosenBodyTypes: LiveBodyType[];
  chosenTransmissionTypes: LiveTransmissionType[];
  chosenVTypes: LiveVType[];
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
      chosenEngines: [],
      chosenDriveTrains: [],
      chosenBodyTypes: [],
      chosenTransmissionTypes: [],
      chosenVTypes: [],
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
        deleteEntryFromCheckbox(entry: {
          id: string;
          name: string;
          status?: boolean;
        }) {
          // --- Engines
          let updatedEngines = store
            .chosenEngines()
            .filter((item) => item.id !== entry.id);
          patchState(store, { chosenEngines: updatedEngines });

          if (entry.status) {
            const updatedAll = store
              .allEngines()
              .map((engine) =>
                engine.id === entry.id ? { ...engine, status: false } : engine
              );
            patchState(store, { allEngines: updatedAll });
          }

          vehicleStore.setVehicleSearchCriterias({
            engineTypeIds: updatedEngines.map((i) => i.id),
          });

          // --- Drivetrain Types
          let updatedDrivetrains = store
            .chosenDriveTrains()
            .filter((item) => item.id !== entry.id);
          patchState(store, { chosenDriveTrains: updatedDrivetrains });

          if (entry.status) {
            const updatedAll = store
              .allDriveTrains()
              .map((dt) =>
                dt.id === entry.id ? { ...dt, status: false } : dt
              );
            patchState(store, { allDriveTrains: updatedAll });
          }

          vehicleStore.setVehicleSearchCriterias({
            drivetrainTypeIds: updatedDrivetrains.map((i) => i.id),
          });

          // --- Body Types
          let updatedBodyTypes = store
            .chosenBodyTypes()
            .filter((item) => item.id !== entry.id);
          patchState(store, { chosenBodyTypes: updatedBodyTypes });

          if (entry.status) {
            const updatedAll = store
              .allBodyTypes()
              .map((bt) =>
                bt.id === entry.id ? { ...bt, status: false } : bt
              );
            patchState(store, { allBodyTypes: updatedAll });
          }

          vehicleStore.setVehicleSearchCriterias({
            bodyTypeIds: updatedBodyTypes.map((i) => i.id),
          });

          // --- Transmission Types
          let updatedTransmissions = store
            .chosenTransmissionTypes()
            .filter((item) => item.id !== entry.id);
          patchState(store, { chosenTransmissionTypes: updatedTransmissions });

          if (entry.status) {
            const updatedAll = store
              .allTransmissionTypes()
              .map((tt) =>
                tt.id === entry.id ? { ...tt, status: false } : tt
              );
            patchState(store, { allTransmissionTypes: updatedAll });
          }

          vehicleStore.setVehicleSearchCriterias({
            transmissionTypeIds: updatedTransmissions.map((i) => i.id),
          });

          // --- VTypes
          let updatedVTypes = store
            .chosenVTypes()
            .filter((item) => item.id !== entry.id);
          patchState(store, { chosenVTypes: updatedVTypes });

          if (entry.status) {
            const updatedAll = store
              .allVTypes()
              .map((vt) =>
                vt.id === entry.id ? { ...vt, status: false } : vt
              );
            patchState(store, { allVTypes: updatedAll });
          }

          vehicleStore.setVehicleSearchCriterias({
            vTypeIds: updatedVTypes.map((i) => i.id),
          });

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
              if (!store.chosenEngines().some((i) => i.id === event.item.id)) {
                const updated = [...store.chosenEngines(), event.item];
                patchState(store, { chosenEngines: updated });

                vehicleStore.setVehicleSearchCriterias({
                  engineTypeIds: updated.map((i) => i.id),
                });
              }
            } else if (event.filterType === 'Тип приводу') {
              if (
                !store.chosenDriveTrains().some((i) => i.id === event.item.id)
              ) {
                const updated = [...store.chosenDriveTrains(), event.item];
                patchState(store, { chosenDriveTrains: updated });
                vehicleStore.setVehicleSearchCriterias({
                  drivetrainTypeIds: updated.map((i) => i.id),
                });
              }
            } else if (event.filterType === 'Тип кузова') {
              if (
                !store.chosenBodyTypes().some((i) => i.id === event.item.id)
              ) {
                const updated = [...store.chosenBodyTypes(), event.item];
                patchState(store, { chosenBodyTypes: updated });
                vehicleStore.setVehicleSearchCriterias({
                  bodyTypeIds: updated.map((i) => i.id),
                });
              }
            } else if (event.filterType === 'Тип трансмісії') {
              if (
                !store
                  .chosenTransmissionTypes()
                  .some((i) => i.id === event.item.id)
              ) {
                const updated = [
                  ...store.chosenTransmissionTypes(),
                  event.item,
                ];
                patchState(store, { chosenTransmissionTypes: updated });
                vehicleStore.setVehicleSearchCriterias({
                  transmissionTypeIds: updated.map((i) => i.id),
                });
              }
            } else if (event.filterType === 'Тип транспортного засобу') {
              if (!store.chosenVTypes().some((i) => i.id === event.item.id)) {
                const updated = [...store.chosenVTypes(), event.item];
                patchState(store, { chosenVTypes: updated });
                vehicleStore.setVehicleSearchCriterias({
                  vTypeIds: updated.map((i) => i.id),
                });
              }
            }
          } else {
            if (event.filterType === 'Тип двигуна') {
              const updated = store
                .chosenEngines()
                .filter((item) => item.id !== event.item.id);
              patchState(store, { chosenEngines: updated });

              const updatedEngineTypeIds = updated.map((item) => item.id);
              vehicleStore.setVehicleSearchCriterias({
                engineTypeIds: updatedEngineTypeIds,
              });
            } else if (event.filterType === 'Тип приводу') {
              const updated = store
                .chosenDriveTrains()
                .filter((item) => item.id !== event.item.id);
              patchState(store, { chosenDriveTrains: updated });
              const updatedDriveTrainIds = updated.map((item) => item.id);
              vehicleStore.setVehicleSearchCriterias({
                drivetrainTypeIds: updatedDriveTrainIds,
              });
            } else if (event.filterType === 'Тип кузова') {
              const updated = store
                .chosenBodyTypes()
                .filter((item) => item.id !== event.item.id);
              patchState(store, { chosenBodyTypes: updated });
              const updatedBodyTypeIds = updated.map((item) => item.id);
              vehicleStore.setVehicleSearchCriterias({
                bodyTypeIds: updatedBodyTypeIds,
              });
            } else if (event.filterType === 'Тип трансмісії') {
              const updated = store
                .chosenTransmissionTypes()
                .filter((item) => item.id !== event.item.id);
              patchState(store, { chosenTransmissionTypes: updated });
              const updatedTransmissionTypeIds = updated.map((item) => item.id);
              vehicleStore.setVehicleSearchCriterias({
                transmissionTypeIds: updatedTransmissionTypeIds,
              });
            } else if (event.filterType === 'Тип транспортного засобу') {
              const updated = store
                .chosenVTypes()
                .filter((item) => item.id !== event.item.id);
              patchState(store, { chosenVTypes: updated });
              const updatedVTypeIds = updated.map((item) => item.id);
              vehicleStore.setVehicleSearchCriterias({
                vTypeIds: updatedVTypeIds,
              });
            }
          }
          vehicleStore.loadVehicles();
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
