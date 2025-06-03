import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostListener,
  input,
  InputSignal,
  output,
  signal,
  viewChild,
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
import { LocationRegion } from '../../../../shared/models/interfaces/vehicle-properties/LocationRegion.interface';
import { LocationTown } from '../../../../shared/models/interfaces/vehicle-properties/LocationTown.interface';

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
export class FilterDropdownComponent<T extends { id: string; name: string }>{
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef<HTMLDivElement>;

  // Inputs
  items = input<T[]>();
  placeHolder = input.required<string>();
  dependentFilter: InputSignal<FilterType | undefined> = input<FilterType>();
  lockingDropDown = input<boolean>();
  filterReset = input<boolean>();
  zIndexValue = input<string>();

  // Outputs
  callForBrandPatchState = output<T>();
  callForModelPatchState = output<T>();
  callForRegionPatchState = output<T>();
  callForTownPatchState = output<T>();

  filterResetWasUsed = output<FilterType>();

  // State
  selectedItemName = input<string | undefined>();
  isShown = signal(false);
  animationState = signal('closed');

  // Reset for filters
  resetFilterEffect = effect(() => {
    if (this.filterReset()) {
      this.filterResetWasUsed.emit(this.dependentFilter()!);
    }
  });

  /** Handle selection of an item */
  handleNewChoicePicked(item: T): void {
    switch (this.dependentFilter()) {
      case FilterType.modelFilter: {
        this.callForModelPatchState.emit(item);
        break;
      }
      case FilterType.brandFilter: {
        this.callForBrandPatchState.emit(item);
        break;
      }
      case FilterType.regionFilter: {
        this.callForRegionPatchState.emit(item);
        break;
      }
      case FilterType.townFilter: {
        this.callForTownPatchState.emit(item);
        break;
      }
    }
  }

  /** Toggle dropdown visibility */
  handleFilterClick() {
    if (
      this.dependentFilter() === FilterType.modelFilter ||
      this.dependentFilter() === FilterType.townFilter
    ) {
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
