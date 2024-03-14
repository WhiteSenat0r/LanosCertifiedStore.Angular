import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Type } from 'src/app/shared/models/type';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-tilehomepage',
  templateUrl: './tilehomepage.component.html',
  styleUrls: ['./tilehomepage.component.css']
})
export class TilehomepageComponent {

  @Input() data: Type[] | Brand[] = [];
  @Output() tileClickEvent: EventEmitter<string> = new EventEmitter<string>();

  // Function to determine the number of items to display based on screen size
  getItemsCount(): number {
    // If screen width is less than or equal to 480px, display 4 items, otherwise display 10 items
    return window.innerWidth <= 480 ? 4 : 10;
  }

  onTileClick(item: Type | Brand) {
    this.tileClickEvent.emit(item.name);
  }

  // Listen to window resize event to update the number of items displayed
  constructor() {
    window.addEventListener('resize', () => {
      this.getItemsCount(); // Update the number of items displayed when window is resized
    });
  }
}
