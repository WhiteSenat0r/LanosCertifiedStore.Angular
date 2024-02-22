import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedOption: string = ''; 

  onOptionSelected(option: string) {
    this.selectedOption = option;
  }
}
