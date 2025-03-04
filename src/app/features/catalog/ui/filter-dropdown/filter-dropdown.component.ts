import {
  Component,
  effect,
  ElementRef,
  HostListener,
  input,
  InputSignal,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';
import { Brand } from '../../../../shared/models/interfaces/vehicle-properties/Brand.interface';
import { Model } from '../../../../shared/models/interfaces/vehicle-properties/Model.interface';
import { FilterType } from '../../models/enums/FilterType.enum';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrl: './filter-dropdown.component.css',
  animations: [
    trigger('dropDown', [
      state(
        'open',
        style({
          height: '*',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          visibility: 'hidden',
        })
      ),
      transition('closed => open', [animate('150ms ease-out')]),
      transition('open => closed', [animate('110ms ease-in')]),
    ]),
  ],
})
export class FilterDropdownComponent {
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  // Inputs
  items = input<Brand[] | Model[]>();
  placeHolder = input.required<string>();
  dependentFilter: InputSignal<FilterType | undefined> = input<FilterType>();
  lockingDropDown = input<boolean>();
  filterReset = input<boolean>();

  // Outputs
  callForBrandPatchState = output<Brand>();
  callForModelPatchState = output<Model>();
  filterResetWasUsed = output<FilterType>();

  // State
  selectedItemName?: string;
  isShown = signal(false);
  animationState = signal('closed');

  // Reset for filters with dependencies
  resetModelFilterEffect = effect(() => {
    if (this.filterReset()) {
      this.selectedItemName = undefined;
      if(this.dependentFilter())
      {
        this.filterResetWasUsed.emit(this.dependentFilter()!);
      }
    }
  });

  /** Handle selection of an item */ 
  handleNewChoicePicked(item: Brand | Model): void {
    this.selectedItemName = item.name;

    if (this.dependentFilter() === FilterType.modelFilter) {
      this.callForModelPatchState.emit(item as Model);
    } else {
      this.callForBrandPatchState.emit(item as Brand);
    }
  }

  /** Toggle dropdown visibility */
  handleFilterClick() {
    if (this.dependentFilter() === FilterType.modelFilter) {
      if (!this.lockingDropDown()) {
        this.isShown.update((value) => !value);
      }
    } else {
      this.isShown.update((value) => !value);
    }
  }

  /** Closes dropdown when clicking outside */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isShown()) return;

    const clickedElement = event.target as HTMLElement;
    const dropdownElement = this.dropdownContainer.nativeElement;

    if (dropdownElement && !dropdownElement.contains(clickedElement)) {
      this.isShown.set(false);
    }
  }

  onAnimationDropDownDone(event: AnimationEvent) {
    this.animationState.set(event.toState);
  }
}
