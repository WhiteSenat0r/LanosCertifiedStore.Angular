import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';
import { Component, input, output, signal } from '@angular/core';
import { LiveBodyType } from '../../models/interfaces/vehicleProperties/LiveBodyType.interface';
import { LiveDrivetrainType } from '../../models/interfaces/vehicleProperties/LiveDrivetrainType.interface';
import { LiveEngineType } from '../../models/interfaces/vehicleProperties/LiveEngineType.interface';
import { LiveTransmissionType } from '../../models/interfaces/vehicleProperties/LiveTransmissionType.interface';
import { LiveVType } from '../../models/interfaces/vehicleProperties/LiveVType.interface';
@Component({
  selector: 'app-filter-checkboxes',
  templateUrl: './filter-checkboxes.component.html',
  styleUrl: './filter-checkboxes.component.css',
  animations: [
    trigger('dropDown', [
      state(
        'open',
        style({
          height: '*',
          marginBottom: '10px',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          marginBottom: '0px',
          visibility: 'hidden',
        })
      ),
      transition('closed => open', [animate('200ms ease-out')]),
      transition('open => closed', [animate('150ms ease-in')]),
    ]),
  ],
})
export class FilterCheckboxesComponent {
  // Inputs
  filterType = input.required<string>();
  allItems = input.required<
    | LiveBodyType[]
    | LiveEngineType[]
    | LiveDrivetrainType[]
    | LiveVType[]
    | LiveTransmissionType[]
  >();
  //Outputs
  checkboxChangedEmitter = output<{
    item:
      | LiveBodyType
      | LiveEngineType
      | LiveDrivetrainType
      | LiveVType
      | LiveTransmissionType;
    filterType: string;
  }>();
  // States
  isExpanded = signal(false);
  animationState: string = 'closed';

  handleFilterClick() {
    this.isExpanded.update((value) => !value);
  }

  onAnimationDropDownDone(event: AnimationEvent) {
    this.animationState = event.toState;
  }

  onCheckboxChange(
    item:
      | LiveBodyType
      | LiveEngineType
      | LiveDrivetrainType
      | LiveVType
      | LiveTransmissionType,
    event: Event
  ) {
    item.status = (event.target as HTMLInputElement).checked;
    this.checkboxChangedEmitter.emit({
      item: item,
      filterType: this.filterType(),
    });
  }
}
