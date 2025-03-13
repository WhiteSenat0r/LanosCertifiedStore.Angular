import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  output,
} from '@angular/core';
import { ViewMode } from '../../models/enums/ViewMode.enum';
import { VehicleInfoOptions } from '../../models/interfaces/VehicleInfoOptions.interface';

@Component({
  selector: 'app-view-mode-selectors',
  templateUrl: './view-mode-selectors.component.html',
  styleUrl: './view-mode-selectors.component.css',
})
export class ViewModeSelectorsComponent {
  // Inputs
  filteredTotalResults = input.required<number>();
  ourViewMode = input.required<ViewMode>();

  currentInfoChips = input<VehicleInfoOptions>();

  // Outputs
  chipClick = output<string>();
  @Output() viewModeToggleEvent = new EventEmitter<ViewMode>();

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
}
