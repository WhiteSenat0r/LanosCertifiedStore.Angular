import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  output,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-type-exhibit-section',
  templateUrl: './type-exhibit-section.component.html',
  styleUrl: './type-exhibit-section.component.css',
})
export class TypeExhibitSectionComponent implements OnChanges {
  readonly spinner = inject(NgxSpinnerService);
  @Input() vehicles!: Vehicle[];
  @Input() bodyTypes!: BodyType[];

  spinnerIsLoading = signal<boolean>(false);

  @Output() clickedBodyTypeEvent = new EventEmitter<BodyType>();
  vehicleCardClick = output<Vehicle>();

  selectedBodyTypeIndex: number = 0;

  public filteredBodyTypes: BodyType[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bodyTypes'] && this.bodyTypes) {
      this.filteredBodyTypes = [{ id: '0', name: 'Усі' }, ...this.bodyTypes];
    }

    if (changes['vehicles'] && this.vehicles) {
      setTimeout(() => {
        this.spinnerIsLoading.set(false);
        this.spinner.hide('sliderDefaultSpinner');
      }, 1000);
    }
  }

  handleTypeClick(bodyType: BodyType, index: number) {
    this.selectedBodyTypeIndex = index;
    this.spinnerIsLoading.set(true);
    this.spinner.show('sliderDefaultSpinner');
    setTimeout(() => {
      this.clickedBodyTypeEvent.emit(bodyType);
    }, 500);
  }

  handleVehicleCardClick(vehicle: Vehicle) {
    this.vehicleCardClick.emit(vehicle);
  }
}
