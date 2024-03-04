import { Component, Input } from '@angular/core';
import { CatalogParams } from 'src/app/shared/models/catalogParams';

@Component({
  selector: 'app-catalog-header',
  templateUrl: './catalog-header.component.html',
  styleUrls: ['./catalog-header.component.css']
})
export class CatalogHeaderComponent {
  date: string = new Date(2001, 1, 1).toString();

  onChipClick(name: string) {
    if (name) {
      if (name === 'type') {
        this.catalogParams.typeName = '';
      }
      if (name === 'brand') {
        this.catalogParams.brandName = '';
        this.catalogParams.modelName = '';
      }
      if (name === 'model') {
        this.catalogParams.modelName = '';
      }
      if (name === 'color') {
        this.catalogParams.colorName = '';
      }
      if (name === 'lowerPriceLimit') {
        this.catalogParams.lowerPriceLimit = 0;
      }
      if (name === 'upperPriceLimit') {
        this.catalogParams.upperPriceLimit = 100000;
      }
      if (name === 'minimalPriceDate') {
        this.catalogParams.minimalPriceDate = new Date(2001, 1, 1);
      }
    }
  }

  onCancelClick() {
  }

  @Input() catalogParams: CatalogParams = new CatalogParams();
}
