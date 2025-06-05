import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SortDirection } from '../../../models/enums/SortDirection.enum';
import { VehicleFilterStore } from '../../../stores/vehicle-filter/vehicle-filter.store';

@Component({
  selector: 'app-sorting-dropdown',
  templateUrl: './sorting-dropdown.component.html',
})
export class SortingDropdownComponent {
  vehicleFilterStore = inject(VehicleFilterStore);
  @ViewChild('dropdownContainer')
  dropdownContainer!: ElementRef<HTMLDivElement>;
  isShown = signal(false);
  chosenSorting = input.required<SortDirection>();
  sortingTypes = Object.values(SortDirection);

  choseSortingEvent = output<SortDirection>();

  handleChosenSortingEvent(chosenSorting: SortDirection) {
    this.choseSortingEvent.emit(chosenSorting);
  }

  handleSortingDropDownClick() {
    this.isShown.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isShown()) return;

    const clickedElement = event.target as HTMLElement;
    const dropdownElement = this.dropdownContainer.nativeElement;

    if (dropdownElement && !dropdownElement.contains(clickedElement)) {
      this.isShown.set(false);
    }
  }
}
