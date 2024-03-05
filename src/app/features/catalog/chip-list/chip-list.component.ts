import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatalogParams } from 'src/app/shared/models/catalogParams';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css'],
})
export class ChipListComponent {
  date: string = new Date(2001, 1, 1).toString();

  onChipClick(chip: string): void {
    this.selectedChipClick.emit(chip);
  }

  get isCatalogParamsDefault(): boolean {
    return !(
      this.catalogParams.typeName != '' ||
      this.catalogParams.brandName != '' ||
      this.catalogParams.colorName != '' ||
      this.catalogParams.modelName != '' ||
      this.catalogParams.lowerPriceLimit != 0 ||
      this.catalogParams.upperPriceLimit != 100000 ||
      this.catalogParams.minimalPriceDate.toString() != this.date
    );
  }

  @Input() catalogParams: CatalogParams = new CatalogParams();
  @Output() selectedChipClick: EventEmitter<string> =
    new EventEmitter<string>();
}
