import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';
import { ViewMode } from '../../models/enums/ViewMode.enum';

@Component({
  selector: 'app-view-mode-selectors',
  templateUrl: './view-mode-selectors.component.html',
  styleUrl: './view-mode-selectors.component.css',
})
export class ViewModeSelectorsComponent {
  // Inputs
  @Input({ required: true }) filteredTotalResults!: number;
  @Input({ required: true }) ourViewMode!: ViewMode;
  
  currentFilterChips = input<any>();

  // Outputs
  @Output() viewModeToggleEvent = new EventEmitter<ViewMode>();

  // States 
  ViewMode = ViewMode;

  // Direct event handlers
  onViewModeButtonClick(option: ViewMode) {
    this.viewModeToggleEvent.emit(option);
  }
}
