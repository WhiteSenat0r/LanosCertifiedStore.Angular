import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  
  @Output() optionSelected = new EventEmitter<string>();

  selectType() {
    this.optionSelected.emit('type');
  }

  selectColor() {
    this.optionSelected.emit('color');
  }

  selectBrand() {
    this.optionSelected.emit('brand');
  }
}