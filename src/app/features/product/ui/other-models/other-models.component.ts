import { Component, input, output } from '@angular/core';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';

@Component({
  selector: 'app-other-models',
  templateUrl: './other-models.component.html',
})
export class OtherModelsComponent {
  models = input<Model[]>();
  brandName = input.required<string>();

  modelClicked = output<Model>();
  brandClicked = output<string>();

  OnModelClick(model: Model) {
    this.modelClicked.emit(model);
  }

  goToCatalogWithBrandName(brandName: string) {
    this.brandClicked.emit(brandName);
  }
}
