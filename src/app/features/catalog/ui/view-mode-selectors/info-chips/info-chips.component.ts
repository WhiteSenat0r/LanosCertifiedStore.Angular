import { Component, computed, input, output } from '@angular/core';
import { VehicleInfoOptions } from '../../../models/interfaces/VehicleInfoOptions.interface';
import { Brand } from '../../../../../shared/models/interfaces/vehicle-properties/Brand.interface';

@Component({
  selector: 'app-info-chips',
  templateUrl: './info-chips.component.html',
})
export class InfoChipsComponent<T extends { id: string; name: string }> {
  // Inputs
  infoChips = input<VehicleInfoOptions>();

  // Outputs
  chipClick = output<string>();

  // Computed
  infoChipsEntries = computed(() => {
    if (this.infoChips()) {
      return Object.entries(this.infoChips()!).map(([key, value]) => ({
        property: key,
        value: value,
      })) as { property: string; value: T }[];
    }
    return null;
  });

  // Event handlers
  handleChipClick(propertyName: string) {
    this.chipClick.emit(propertyName);
  }
}
