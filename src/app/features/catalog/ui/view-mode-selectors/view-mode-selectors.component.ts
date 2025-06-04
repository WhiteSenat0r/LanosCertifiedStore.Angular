import {
  Component,
  ElementRef,
  EventEmitter,
  input,
  Input,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import { ViewMode } from '../../models/enums/ViewMode.enum';
import { VehicleInfoOptions } from '../../models/interfaces/VehicleInfoOptions.interface';
import { VehicleInfoArrays } from '../../models/interfaces/VehicleInfoArrays.interface';
import { SortDirection } from '../../models/enums/SortDirection.enum';

@Component({
  selector: 'app-view-mode-selectors',
  templateUrl: './view-mode-selectors.component.html',
  styleUrl: './view-mode-selectors.component.css',
})
export class ViewModeSelectorsComponent {
  @ViewChild('filterButton', { static: true }) filterButton!: ElementRef<HTMLDivElement>;

  // Inputs
  chosenSorting = input.required<SortDirection>();
  filteredTotalResults = input.required<number>();
  ourViewMode = input.required<ViewMode>();

  currentInfoChips = input<VehicleInfoOptions>();
  currentInfoArrays = input<VehicleInfoArrays>();

  // Outputs
  chipClick = output<string>();
  arrayedChipClick = output<{ id: string; name: string }>();
  choseSortingEvent = output<SortDirection>();
  @Output() viewModeToggleEvent = new EventEmitter<ViewMode>();
  filterClicked = output<ElementRef<HTMLDivElement>>();

  // States
  ViewMode = ViewMode;

  // Direct event handlers
  onViewModeButtonClick(option: ViewMode) {
    this.viewModeToggleEvent.emit(option);
  }

  //Event handlers
  handleChipClick(propertyName: string) {
    this.chipClick.emit(propertyName);
  }

  handleArrayedChipClick(entry: { id: string; name: string }) {
    this.arrayedChipClick.emit(entry);
  }

  handleChoseSortingEvent(chosenSorting: SortDirection) {
    this.choseSortingEvent.emit(chosenSorting);
  }

  onFilterButtonClick() {
    this.filterClicked.emit(this.filterButton);
  }
}
