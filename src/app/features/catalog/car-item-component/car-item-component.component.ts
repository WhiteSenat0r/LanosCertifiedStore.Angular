import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CatalogVehicle } from 'src/app/shared/models/CatalogVehicle';

@Component({
  selector: 'app-car-item-component',
  templateUrl: './car-item-component.component.html',
  styleUrls: ['./car-item-component.component.css'],
})
export class CarItemComponentComponent implements OnChanges {
  closestDateOfVehicleFormatted!: string;

  @Input() vehicle?: CatalogVehicle;
  @Input() columnCount?: number;

  ngOnChanges(changes: SimpleChanges): void {
    if ('vehicle' in changes) {
      this.updateClosestDateOfVehicle();
    }
  }

  updateClosestDateOfVehicle() {
    let ourDate = new Date(this.vehicle!.price.issueDate);

    this.closestDateOfVehicleFormatted =
      ourDate.getFullYear().toString() +
      '/' +
      (ourDate.getMonth() + 1).toString() +
      '/' +
      ourDate.getDate().toString();
  }
}
