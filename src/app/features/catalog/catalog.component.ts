import {
  Component,
  effect,
  ElementRef,
  HostListener,
  Inject,
  inject,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ViewMode } from './models/enums/ViewMode.enum';
import { VehicleFilterStore } from './stores/vehicle-filter/vehicle-filter.store';
import { FilterType } from './models/enums/FilterType.enum';
import { VehicleStore } from './stores/vehicles/vehicles.store';
import { Vehicle } from '../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  providers: [VehicleStore, VehicleFilterStore],
})
export class CatalogComponent {
  // Injected stores
  readonly vehicleStore = inject(VehicleStore);
  readonly vehicleFilterStore = inject(VehicleFilterStore);

  // Injections
  readonly router = inject(Router);

  constructor(@Inject(DOCUMENT) private document: Document) {
    effect(() => {
      const html = this.document.documentElement;

      if (this.showModal()) {
        html.classList.add('modal-open');
      } else {
        html.classList.remove('modal-open');
      }
    });
  }

  // Enums
  readonly filterTypeEnum = FilterType;
  readonly viewModeEnum = ViewMode;

  // UI State
  @ViewChild('modelFilter') modelFilter!: ElementRef;
  @ViewChild('modelFilter2') modelFilter2!: ElementRef;
  townFilter = viewChild.required<ElementRef>('townFilter');
  townFilter2 = viewChild.required<ElementRef>('townFilter2');
  currentViewMode: ViewMode = ViewMode.list;
  mobiledEraseIsCalled = signal<boolean>(false);

  showModal = signal(false);
  @ViewChild('modalAside')
  modalAside!: ElementRef<HTMLDivElement>;
  @ViewChild('exitModalButton')
  exitModalButton!: ElementRef<HTMLDivElement>;

  /** Toggles the current view mode (grid or list) */
  handleViewModeToggle(option: ViewMode) {
    this.currentViewMode = option;
  }

  //** Change the page in pagination */
  handlePageChange(pageIndex: number) {
    this.vehicleFilterStore.updatePaginationReset(false);
    this.vehicleStore.setVehicleSearchCriterias({ pageIndex });
    this.vehicleFilterStore.updateQueryParamsForPage(pageIndex);
    this.vehicleStore.loadVehicles();
  }
  /** Updates the minimum price filter */
  handleMinPriceChange(min: number) {
    this.vehicleStore.setVehicleSearchCriterias({ lowerPriceLimit: min });
    this.vehicleStore.loadVehicles();
  }

  /** Updates the maximum price filter */
  handleMaxPriceChange(max: number) {
    this.vehicleStore.setVehicleSearchCriterias({ upperPriceLimit: max });
    this.vehicleStore.loadVehicles();
  }

  handleTransitionToProductPage(vehicle: Vehicle) {
    this.router.navigate(['/catalog', vehicle.id]);
  }

  /** Show or hide showBrandToolTip accordingly to the emptiness of vehicleFilterStore.models() */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Brands and models
    if (
      (this.modelFilter?.nativeElement.contains(event.target) &&
        !this.vehicleFilterStore.brand()) ||
      (this.modelFilter2?.nativeElement.contains(event.target) &&
        !this.vehicleFilterStore.brand())
    ) {
      this.vehicleFilterStore.changeShowBrandToolTip(true);
    } else if (this.vehicleFilterStore.showBrandToolTip()) {
      this.vehicleFilterStore.changeShowBrandToolTip(false);
    }

    // Regions and towns
    if (
      (this.townFilter().nativeElement.contains(event.target) &&
        !this.vehicleFilterStore.region()) ||
      (this.townFilter2().nativeElement.contains(event.target) &&
        !this.vehicleFilterStore.region())
    ) {
      this.vehicleFilterStore.changeShowRegionToolTip(true);
    } else if (this.vehicleFilterStore.showRegionToolTip()) {
      this.vehicleFilterStore.changeShowRegionToolTip(false);
    }

    // Modal
    if (this.showModal() === true) {
      const clickedElement = event.target as HTMLElement;
      const modalElement = this.modalAside.nativeElement;
      const exitElement = this.exitModalButton.nativeElement;

      const isClickOutsideModal =
        modalElement && !modalElement.contains(clickedElement);
      const isClickOnExitModalButton =
        exitElement && exitElement.contains(clickedElement);
      const isClickOutsideFilterButton =
        !this.filterButtonRef ||
        !this.filterButtonRef.nativeElement.contains(clickedElement);

      if (
        isClickOnExitModalButton ||
        (isClickOutsideModal && isClickOutsideFilterButton)
      ) {
        this.showModal.set(false);
      }
    }
  }

  filterButtonRef!: ElementRef<HTMLDivElement>;
  handleFilterClicked(ref: ElementRef<HTMLDivElement>) {
    this.showModal.update((value) => !value);
    this.filterButtonRef = ref;
  }

  onClearClicked(option: string): void {
    this.mobiledEraseIsCalled.set(true);

    setTimeout(() => {
      this.vehicleFilterStore.setPropertyStateToDefault(option);
      this.mobiledEraseIsCalled.set(false);
    }, 500);
  }
}
