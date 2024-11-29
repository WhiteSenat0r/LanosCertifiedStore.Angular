import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EngineType } from '../../../../shared/models/BaseApiModels/EngineType';
import { PriceRange } from '../../models/PriceRange';
import { DropdownElementData } from '../../models/DropdownElementData.enum';

@Component({
  selector: 'app-advanced-search-section',
  templateUrl: './advanced-search-section.component.html',
  styleUrl: './advanced-search-section.component.css',
})
export class AdvancedSearchSectionComponent {
  @Input() DropDownElementUlInfo?: string[];
  @Input() priceRange$!: Observable<PriceRange>;

  @Output() getInfoForUlEvent = new EventEmitter<DropdownElementData>();

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.getInfoForUlEvent.emit(ApiCallOption);
  }
}
