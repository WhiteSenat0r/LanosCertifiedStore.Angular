import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';
import { Component, input, output, signal } from '@angular/core';
import { BodyType } from '../../../../shared/models/interfaces/vehicle-properties/BodyType.interface';
import { DrivetrainType } from '../../../../shared/models/interfaces/vehicle-properties/DrivetrainType.interface';
import { EngineType } from '../../../../shared/models/interfaces/vehicle-properties/EngineType.interface';
import { VType } from '../../../../shared/models/interfaces/vehicle-properties/VType.interface';
import { TransmissionType } from '../../../../shared/models/interfaces/vehicle-properties/TransmissionType.interface';

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
    BodyType[] | EngineType[] | DrivetrainType[] | VType[] | TransmissionType[]
  >();

  //Outputs
  checkboxChangedEmitter = output<{
    item: BodyType | EngineType | DrivetrainType | VType | TransmissionType;
    checked: boolean;
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
    item: BodyType | EngineType | DrivetrainType | VType | TransmissionType,
    event: Event
  ) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checkboxChangedEmitter.emit({ item: item, checked: isChecked, filterType: this.filterType()});
  }
}
