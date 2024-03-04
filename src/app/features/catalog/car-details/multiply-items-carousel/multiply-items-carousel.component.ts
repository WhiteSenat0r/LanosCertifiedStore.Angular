import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListVehicle } from 'src/app/shared/models/ListVehicle';

@Component({
  selector: 'app-multiply-items-carousel',
  templateUrl: './multiply-items-carousel.component.html',
  styleUrls: ['./multiply-items-carousel.component.css']
})
export class MultiplyItemsCarouselComponent {
  @Input() vehicles!: ListVehicle[];
  @Output() changeVehicleTap: EventEmitter<any | null> = new EventEmitter<any | null>();

  get carouselVehiclesPairs() {
    const pairs = [];
    for (let i = 0; i < this.vehicles?.length; i += 3) {
      pairs.push([this.vehicles[i], this.vehicles[i + 1], this.vehicles[i + 2]]);
    }
    return pairs;
  }

  changeVehicle(vehicleId: string)
  {
    this.changeVehicleTap.emit(vehicleId);
  }
}
