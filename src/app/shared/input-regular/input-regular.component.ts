import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-regular',
  templateUrl: './input-regular.component.html',
  styleUrls: ['./input-regular.component.css']
})
export class InputRegularComponent {


  @Input() placeholder?: string;
}
