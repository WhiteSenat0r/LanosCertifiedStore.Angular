import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Vehicle } from '../../../../shared/models/ApiModels/Vehicle';
import { BodyType } from '../../../../shared/models/ApiModels/BodyType';

@Component({
  selector: 'app-type-exhibit-section',
  templateUrl: './type-exhibit-section.component.html',
  styleUrl: './type-exhibit-section.component.css',
})
export class TypeExhibitSectionComponent implements OnChanges {
  @Input() vehicles!: Vehicle[];
  @Input() bodyTypes!: BodyType[];

  @Output() clickedBodyTypeEvent = new EventEmitter<BodyType>();

  selectedBodyTypeIndex: number = 0;

  public filteredBodyTypes: BodyType[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bodyTypes'] && this.bodyTypes) {
      this.filteredBodyTypes = [
        { id: '0', name: 'Усі' },
        ...this.bodyTypes,
      ];
    }
  }

  handleTypeClick(bodyType: BodyType, index: number) {
    this.selectedBodyTypeIndex = index;
    this.clickedBodyTypeEvent.emit(bodyType);
  }
}
