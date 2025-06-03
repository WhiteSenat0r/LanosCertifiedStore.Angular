import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownElementData } from '../../models/enums/DropdownElementData.enum';
import { PriceRange } from '../../models/interfaces/PriceRange.interface';
import { SearchAdvancedParams } from '../../models/interfaces/SearchAdvancedParams.interface';

@Component({
  selector: 'app-fast-search-section',
  templateUrl: './fast-search-section.component.html',
  styleUrl: './fast-search-section.component.css',
})
export class FastSearchSectionComponent {
  @Input() InfoObjectDataOptionated?: {
    ApiCallOption: string;
    DropDownElementUlInfo: Array<{ id: string; name: string }>;
  };
  @Input() priceRange$!: Observable<PriceRange>;

  @Output() getInfoForUlEvent = new EventEmitter<DropdownElementData>();

  handleGetInfoForUlEvent(ApiCallOption: DropdownElementData) {
    this.getInfoForUlEvent.emit(ApiCallOption);
  }

  @Output() changeRouterLinkEvent: EventEmitter<SearchAdvancedParams> =
    new EventEmitter<SearchAdvancedParams>();
  handleChangeRouterLink(searchAdvanced: SearchAdvancedParams): void {
    this.changeRouterLinkEvent.emit(searchAdvanced);
  }
}
