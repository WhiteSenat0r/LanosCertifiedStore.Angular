import { Component, input } from '@angular/core';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';

@Component({
  selector: 'app-other-models',
  templateUrl: './other-models.component.html',
})
export class OtherModelsComponent {
  models = input<Model[]>();

  
}
