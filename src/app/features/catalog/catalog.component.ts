import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ViewMode } from './models/enums/ViewMode.enum';
import { VehicleFilterStore } from './stores/vehicle-filter/vehicle-filter.store';
import { VehicleColor } from '../../shared/models/interfaces/vehicle-properties/VehicleColor.interface';
import { FilterType } from './models/enums/FilterType.enum';
import { VehicleSearchCriterias } from './models/classes/VehicleSearchCriterias.class';
import { VehicleStore } from './stores/vehicles/vehicles.store';
import { Vehicle } from '../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  providers: [VehicleStore, VehicleFilterStore],
})
export class CatalogComponent {
  // Injected stores
  readonly vehicleStore = inject(VehicleStore);
  readonly vehicleFilterStore = inject(VehicleFilterStore);

  // Injections
  readonly router = inject(Router);

  // Enums
  readonly filterTypeEnum = FilterType;
  readonly viewModeEnum = ViewMode;

  // UI State
  @ViewChild('modelFilter') modelFilter!: ElementRef;
  townFilter = viewChild.required<ElementRef>('townFilter');
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
    this.vehicleFilterStore.setColor(color);
  }

  /** Updates the minimum price filter */
  handleMinPriceChange(min: number) {
    this.updateVehicleSearch({ lowerPriceLimit: min });
  }

  /** Updates the maximum price filter */
  handleMaxPriceChange(max: number) {
    console.log('wtf');
    this.updateVehicleSearch({ upperPriceLimit: max });
  }

  handleTransitionToProductPage(vehicle: Vehicle) {
     this.router.navigate(['/catalog', vehicle.id]);
  }

  /** Show or hide showBrandToolTip accordingly to the emptiness of vehicleFilterStore.models() */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Brands and models
    if (
      this.modelFilter?.nativeElement.contains(event.target) &&
      !this.vehicleFilterStore.brand()
    ) {
      this.vehicleFilterStore.changeShowBrandToolTip(true);
    } else if (this.vehicleFilterStore.showBrandToolTip()) {
      this.vehicleFilterStore.changeShowBrandToolTip(false);
    }

    // Regions and towns
    if (
      this.townFilter().nativeElement.contains(event.target) &&
      !this.vehicleFilterStore.region()
    ) {
      this.vehicleFilterStore.changeShowRegionToolTip(true);
    } else if (this.vehicleFilterStore.showRegionToolTip()) {
      this.vehicleFilterStore.changeShowRegionToolTip(false);
    }
  }

  /** Updates vehicle search criteria and reloads vehicles */
  private updateVehicleSearch(criteria: Partial<VehicleSearchCriterias>) {
    this.vehicleStore.setVehicleSearchCriterias(criteria);
    this.vehicleStore.loadVehicles();
  }
}
