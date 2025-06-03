import {
  Component,
  effect,
  inject,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-data-view',
  templateUrl: './vehicle-data-view.component.html',
  styleUrl: './vehicle-data-view.component.css',
})
export class VehicleDataViewComponent {
  readonly spinner = inject(NgxSpinnerService);

  @Input({ required: true }) vehicles!: Vehicle[];
  isLoading = input.required<boolean>();

  spinnerEffect = effect(() => {
    if (this.isLoading()) {
      this.spinner.show('catalogSpinner');
    }
    else{
      this.spinner.hide('catalogSpinner');
    }
  });

  goToProductPage = output<Vehicle>();

  handleCardClick(vehicle: Vehicle) {
    this.goToProductPage.emit(vehicle);
  }
}
