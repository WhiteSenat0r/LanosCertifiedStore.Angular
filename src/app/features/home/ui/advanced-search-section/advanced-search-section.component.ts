import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EngineType } from '../../../../shared/models/BaseApiModels/EngineType';
import { PriceRange } from '../../models/PriceRange';
import { DropdownElementData } from '../../models/DropdownElementData.enum';
import { SearchAdvancedParams } from '../../models/SearchAdvancedParams';

@Component({
  selector: 'app-advanced-search-section',
  templateUrl: './advanced-search-section.component.html',
  styleUrl: './advanced-search-section.component.css',
})
export class AdvancedSearchSectionComponent {
  @Input() InfoObjectDataOptionated?: {
    ApiCallOption: string;
    DropDownElementUlInfo: string[];
  };
  @Input() priceRange$!: Observable<PriceRange>;

  @Output() getInfoForUlEvent = new EventEmitter<DropdownElementData>();

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.getInfoForUlEvent.emit(ApiCallOption);
  }

  @Output() changeRouterLinkEvent: EventEmitter<SearchAdvancedParams> = new EventEmitter<SearchAdvancedParams>();
  handleChangeRouterLink(searchAdvanced: SearchAdvancedParams): void {
    this.changeRouterLinkEvent.emit(searchAdvanced);
  }
}
