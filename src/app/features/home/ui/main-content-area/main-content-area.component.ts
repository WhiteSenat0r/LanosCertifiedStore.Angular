import { AfterViewInit, Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BodyType } from '../../../../shared/models/BodyType';
import { Brand } from '../../../../shared/models/Brand';

@Component({
  selector: 'app-main-content-area',
  templateUrl: './main-content-area.component.html',
})
export class MainContentAreaComponent{
  @Input() bodyTypes: BodyType[] = [];
  @Input() brands: Brand[] = [];

  bodyTypeImages: string[] = ["assets/images/bodyTypeImages/cabriolet.png",
    "assets/images/bodyTypeImages/coupe.png",
    "assets/images/bodyTypeImages/crossover.png",
    "assets/images/bodyTypeImages/liftback.png",
    "assets/images/bodyTypeImages/minivan.png",
    "assets/images/bodyTypeImages/pickup-truck.png",
    "assets/images/bodyTypeImages/sedan.png",
    "assets/images/bodyTypeImages/universal.png"
  ];

  constructor() {}
}
