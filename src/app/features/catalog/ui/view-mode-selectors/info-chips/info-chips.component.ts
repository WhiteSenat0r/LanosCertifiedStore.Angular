import { Component, computed, effect, inject, input, output } from '@angular/core';
import { VehicleInfoOptions } from '../../../models/interfaces/VehicleInfoOptions.interface';
import { VehicleInfoArrays } from '../../../models/interfaces/VehicleInfoArrays.interface';
import { VehicleFilterStore } from '../../../stores/vehicle-filter/vehicle-filter.store';

// type InfoChipEntry = {
//   property: string;
//   value: VehicleInfoOptions[keyof VehicleInfoOptions];
// };

@Component({
  selector: 'app-info-chips',
  templateUrl: './info-chips.component.html',
})
export class InfoChipsComponent {
  //FOR filter-price-sake!
  readonly vehicleFilterStore = inject(VehicleFilterStore);

  // Inputs
  infoChips = input<VehicleInfoOptions>();
  infoArrays = input<VehicleInfoArrays>();

  // Outputs
  chipClick = output<string>();
  arrayedChipClick = output<{ id: string; name: string }>();

  // Computed
  infoChipsEntries = computed<any>(() => {
    const data = this.infoChips();
    if (!data) return [];

    return Object.entries(data)
      .filter(([property, value]) => {
        if (property === 'lowerPrice') {
          return value !== this.vehicleFilterStore.priceRange().lowest;
        }
        if (property === 'upperPrice') {
          return value !== this.vehicleFilterStore.priceRange().highest;
        }
        return value !== undefined;
      })
      .map(([property, value]) => ({
        property: property as string,
        value: value as string,
      }));
  });

  countNormalChips = computed<number>(() => {
    const entries = this.infoChipsEntries();

    let total = 0;

    entries.forEach((entry: string[][]) => {
      total += 1;
    });

    return total;
  });

  countChipsOfCheckboxes = computed<number>(() => {
    return this.checkboxesEntries().length;
  });
  // Computed "PLURAL" CHIPS
  checkboxesEntries = computed(() => {
    const data = [
      ...(this.infoArrays()?.engineTypeIds || []),
      ...(this.infoArrays()?.bodyTypeIds || []),
      ...(this.infoArrays()?.drivetrainTypeIds || []),
      ...(this.infoArrays()?.transmissionTypeIds || []),
      ...(this.infoArrays()?.vTypeIds || []),
    ];
    return data;
  });

  // Event handlers
  handleChipClick(propertyName: string) {
    this.chipClick.emit(propertyName);
  }

  handelEraseAllClick() {
    this.chipClick.emit('eraseAll');
  }

  handleCheckboxChipClick(entry: {
    id: string;
    name: string;
    status?: boolean;
  }) {
    this.arrayedChipClick.emit(entry);
  }
}
