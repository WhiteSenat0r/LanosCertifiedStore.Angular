import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { VehicleInfoOptions } from '../../../models/interfaces/VehicleInfoOptions.interface';
import { VehicleInfoArrays } from '../../../models/interfaces/VehicleInfoArrays.interface';

// type InfoChipEntry = {
//   property: string;
//   value: VehicleInfoOptions[keyof VehicleInfoOptions];
// };

@Component({
  selector: 'app-info-chips',
  templateUrl: './info-chips.component.html',
})
export class InfoChipsComponent {
  // Inputs
  infoChips = input<VehicleInfoOptions>();
  infoArrays = input<VehicleInfoArrays>();

  // Outputs
  chipClick = output<string>();
  arrayedChipClick = output< { id: string; name: string }>();

  // Computed
  infoChipsEntries = computed<any>(() => {
    const data = this.infoChips();
    if (!data) return [];

    return Object.entries(data)
      .filter(([_, value]) => {
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

  handleCheckboxChipClick(entry: { id: string; name: string; status?: boolean}) {
    this.arrayedChipClick.emit(entry);
  }
}
