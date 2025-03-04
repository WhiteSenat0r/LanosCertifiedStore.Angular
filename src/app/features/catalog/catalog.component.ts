import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VehicleStore } from './stores/vehicles.store';
import { ViewMode } from './models/enums/ViewMode.enum';
import { VehicleFilterStore } from './stores/vehicleFilter.store';
import { VehicleColor } from '../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { FilterType } from './models/enums/FilterType.enum';
import { VehicleSearchCriterias } from './models/classes/VehicleSearchCriterias.class';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  providers: [VehicleStore, VehicleFilterStore],
})
export class CatalogComponent {
  // Injected stores
  readonly vehicleStore = inject(VehicleStore);
  readonly vehicleFilterStore = inject(VehicleFilterStore);

  // Enums
  readonly filterTypeEnum = FilterType;
  readonly viewModeEnum = ViewMode;

  // UI State
  @ViewChild('modelFilter') modelFilter!: ElementRef;
  currentViewMode: ViewMode = ViewMode.grid;

  /** Toggles the current view mode (grid or list) */
  handleViewModeToggle(option: ViewMode) {
    this.currentViewMode = option;
  }

  //** Change the page in pagination */
  handlePageChange(pageIndex: number) {
    this.updateVehicleSearch({ pageIndex });
  }

  /** Updates the selected vehicle color */
  handleColorChange(color: VehicleColor) {
    this.updateVehicleSearch({ colorId: color.id });
    this.vehicleFilterStore.loadPriceRange();
  }

  /** Updates the minimum price filter */
  handleMinPriceChange(min: number) {
    this.updateVehicleSearch({ lowerPriceLimit: min });
  }

  /** Updates the maximum price filter */
  handleMaxPriceChange(max: number) {
    this.updateVehicleSearch({ upperPriceLimit: max });
  }

  /** Show or hide showBrandToolTip accordingly to the emptiness of vehicleFilterStore.models() */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (
      this.modelFilter?.nativeElement.contains(event.target) && !this.vehicleFilterStore.brand()
    ) {
      this.vehicleFilterStore.changeShowBrandToolTip(true);
    } else if (this.vehicleFilterStore.showBrandToolTip()) {
      this.vehicleFilterStore.changeShowBrandToolTip(false);
    }
  }

  /** Updates vehicle search criteria and reloads vehicles */
  private updateVehicleSearch(criteria: Partial<VehicleSearchCriterias>) {
    this.vehicleStore.setVehicleSearchCriterias(criteria);
    this.vehicleStore.loadVehicles();
  }
}
