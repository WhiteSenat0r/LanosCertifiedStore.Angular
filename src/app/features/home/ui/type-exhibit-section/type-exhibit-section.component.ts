import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  output,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';

@Component({
  selector: 'app-type-exhibit-section',
  templateUrl: './type-exhibit-section.component.html',
  styleUrl: './type-exhibit-section.component.css',
})
export class TypeExhibitSectionComponent implements OnChanges {
  @Input() vehicles!: Vehicle[];
  @Input() bodyTypes!: BodyType[];

  @Output() clickedBodyTypeEvent = new EventEmitter<BodyType>();
  vehicleCardClick = output<Vehicle>();

  selectedBodyTypeIndex: number = 0;

  public filteredBodyTypes: BodyType[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bodyTypes'] && this.bodyTypes) {
      this.filteredBodyTypes = [{ id: '0', name: 'Усі' }, ...this.bodyTypes];
    }
  }

  handleTypeClick(bodyType: BodyType, index: number) {
    this.selectedBodyTypeIndex = index;
    this.clickedBodyTypeEvent.emit(bodyType);
  }

  handleVehicleCardClick(vehicle: Vehicle) {
    this.vehicleCardClick.emit(vehicle);
  }
}
