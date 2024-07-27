import { AfterViewInit, Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BodyType } from '../../../../shared/models/BodyType';

@Component({
  selector: 'app-main-content-area',
  templateUrl: './main-content-area.component.html',
})
export class MainContentAreaComponent{
  @Input() bodyTypes: BodyType[] = [];

  constructor() {}
}
