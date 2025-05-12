import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { EngineType } from '../../../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { VehicleColor } from '../../../../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { BodyType } from '../../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { DrivetrainType } from '../../../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { TransmissionType } from '../../../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';
import { VType } from '../../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { inject } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { VehicleStore } from '../../vehicles/vehicles.store';

type OtherFilterValuesState = {
  colors: VehicleColor[];
  allEngines: EngineType[];
  allDriveTrains: DrivetrainType[];
  allBodyTypes: BodyType[];
  allTransmissionTypes: TransmissionType[];
  allVTypes: VType[];

  // Related to UI checkbox filters
  chosenEngines: EngineType[];
  chosenDriveTrains: DrivetrainType[];
  chosenBodyTypes: BodyType[];
  chosenTransmissionTypes: TransmissionType[];
  chosenVTypes: VType[];
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
    withMethods((store, catalogService = inject(CatalogService), vehicleStore = inject(VehicleStore)) => ({
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
    })),
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
