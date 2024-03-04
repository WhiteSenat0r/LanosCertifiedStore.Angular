import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-change-view-grid',
  templateUrl: './change-view-grid.component.html',
  styleUrls: ['./change-view-grid.component.css']
})
export class ChangeViewGridComponent {
  twoBactive = false;
  threeBactive = true;
  
  @Output() selectedViewTypeChange: EventEmitter<any | null> =
    new EventEmitter<any | null>();

  OnGTSButton()
  {
      this.twoBactive = true;
      this.threeBactive = false;
      this.selectedViewTypeChange.emit(2);
  }     

  OnGTRButton()
  {
      this.threeBactive = true;
      this.twoBactive = false;
      this.selectedViewTypeChange.emit(3);
  }


}
