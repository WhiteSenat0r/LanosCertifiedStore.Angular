import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Model } from 'src/app/shared/models/model';

@Component({
  selector: 'app-table-items',
  templateUrl: './table-items.component.html',
  styleUrls: ['./table-items.component.css']
})
export class TableItemsComponent {
  @Input() modelsOfBrand?: Model[];
  @Output() modelClick: EventEmitter<any | null> = new EventEmitter<any | null>();

  OnModelClick(model: Model)
  { 
    this.modelClick.emit(model);
  }
}
