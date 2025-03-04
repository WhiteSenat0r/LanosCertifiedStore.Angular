import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ViewMode } from '../../models/enums/ViewMode.enum';

@Component({
  selector: 'app-view-mode-selectors',
  templateUrl: './view-mode-selectors.component.html',
  styleUrl: './view-mode-selectors.component.css',
})
export class ViewModeSelectorsComponent {
  ViewMode = ViewMode;
  @Input({ required: true }) filteredTotalResults!: number;
  @Input({ required: true }) ourViewMode!: ViewMode;
  @Output() viewModeToggleEvent = new EventEmitter<ViewMode>();
  onViewModeButtonClick(option: ViewMode) {
    this.viewModeToggleEvent.emit(option);
  }
}
