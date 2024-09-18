import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  minValue: number = 0;
  maxValue: number = 2500;
  options: Options = {
    floor: 0,
    ceil: 25000,
    step: 1,
    showTicks: false
  };

}
