import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EngineType } from '../../../../shared/models/ApiModels/EngineType';

@Component({
  selector: 'app-advanced-search-section',
  templateUrl: './advanced-search-section.component.html',
  styleUrl: './advanced-search-section.component.css'
})
export class AdvancedSearchSectionComponent {
  @Input() DropDownElementUlInfo?: EngineType[];
  @Input() priceRange$!: Observable<any>;

  @Output() getInfoForUlEvent = new EventEmitter<string>();

  handleGetInfoForUlEvent(data: string) {
    this.getInfoForUlEvent.emit(data);

  }
}
