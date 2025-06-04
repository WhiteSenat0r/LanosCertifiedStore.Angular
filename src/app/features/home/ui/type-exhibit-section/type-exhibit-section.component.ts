import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Vehicle } from '../../../../shared/models/interfaces/vehicle-properties/Vehicle.interface';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, Subject, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-type-exhibit-section',
  templateUrl: './type-exhibit-section.component.html',
  styleUrl: './type-exhibit-section.component.css',
})
export class TypeExhibitSectionComponent
  implements OnInit, OnChanges, OnDestroy
{
  ngOnInit(): void {
    this.spinner.show('sliderDefaultSpinner');
    this.isSpinnerActive.set(true);

    setTimeout(() => {
      this.spinner.hide('sliderDefaultSpinner');
      this.isSpinnerActive.set(false);
    }, 300);

    this.vehiclesChange$.pipe(switchMap(() => timer(1000))).subscribe(() => {
      this.spinner.hide('sliderDefaultSpinner');
      this.isSpinnerActive.set(false);
    });
  }

  public isSpinnerActive = signal<boolean>(false);
  readonly spinner = inject(NgxSpinnerService);
  private vehiclesChange$ = new Subject<void>();
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

    if (changes['vehicles'] && this.vehicles) {
      this.vehiclesChange$.next();
    }
  }

  handleTypeClick(bodyType: BodyType, index: number) {
    this.selectedBodyTypeIndex = index;
    this.clickedBodyTypeEvent.emit(bodyType);
    if (!this.isSpinnerActive()) {
      this.spinner.show('sliderDefaultSpinner');
      this.isSpinnerActive.set(true);
    }
  }

  handleVehicleCardClick(vehicle: Vehicle) {
    this.vehicleCardClick.emit(vehicle);
  }

  ngOnDestroy() {
    if (this.vehiclesChange$) {
      this.vehiclesChange$.unsubscribe();
    }
  }
}
