import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';
import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';

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
  isExpanded = signal(false);
  filterType = input.required<string>();
  animationState: string = 'closed';

  items: any = [
    'First item',
    'Second item',
    'Third item',
    'Fourth item',
    'Fifth item',
  ];

  handleFilterClick() {
    this.isExpanded.update((value) => !value);
  }

  onAnimationDropDownDone(event: AnimationEvent) {
    this.animationState = event.toState;
  }
}
