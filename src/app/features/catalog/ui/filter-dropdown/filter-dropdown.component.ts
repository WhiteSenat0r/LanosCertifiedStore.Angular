import {
  Component,
  ElementRef,
  HostListener,
  input,
  Input,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { SvgIconDisplayComponent } from '../../../../shared/utils/svg-icon-display.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrl: './filter-dropdown.component.css',
  animations: [
    trigger('dropDown', [
      state(
        'open',
        style({
          height: '144px',
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
  placeHolder = input.required<string>();
  kylavlob: WritableSignal<string | undefined> = signal(undefined);

  isShown = signal(false);

  items: any = [
    'First item',
    'Second item',
    'Third item',
    'Fourth item',
    'Fifth item',
    'Sixth item',
  ];

  handleNewChoicePicked(item: string): void {
    this.kylavlob.set(item);
  }

  handleFilterClick() {
    this.isShown.update((value) => !value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isShown()) return;

    const clickedElement = event.target as HTMLElement;
    const dropdownElement = this.dropdownContainer.nativeElement;

    if (dropdownElement && !dropdownElement.contains(clickedElement)) {
      this.isShown.set(false);
    }
  }
}
