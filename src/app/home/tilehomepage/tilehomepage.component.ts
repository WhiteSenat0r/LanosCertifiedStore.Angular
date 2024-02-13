import { Component, Input } from '@angular/core';
import { Type } from 'src/app/shared/models/type';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-tilehomepage',
  templateUrl: './tilehomepage.component.html',
  styleUrls: ['./tilehomepage.component.css']
})
export class TilehomepageComponent {
  @Input() data: Type[] | Brand[] = [];

  constructor() { }
}
