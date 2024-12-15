import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownHeaderData } from '../../../../models/DropdownHeaderData';
import { DropdownElementData } from '../../../../models/DropdownElementData.enum';

@Component({
  selector: 'app-dropdown-element',
  templateUrl: './dropdown-element.component.html',
  styleUrl: './dropdown-element.component.css',
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
export class DropdownElementComponent implements OnInit {
  @Input() divInterfaceData!: DropdownHeaderData;
  @Input() DropDownElementUlInfo?: string[];
  @Output() getInfoForUlEvent: EventEmitter<DropdownElementData> =
    new EventEmitter<DropdownElementData>();
  uniqueId: string = `dropdown-${Math.random().toString(36).slice(2, 11)}`;
  isShown: boolean = false;

  option: string = '';

  ngOnInit() {}
  handleClick(ApiCallOption: DropdownElementData) {
    this.isShown = !this.isShown;
    if (
      this.isShown &&
      (this.DropDownElementUlInfo === undefined ||
        this.DropDownElementUlInfo.length === 0)
    ) {
      if (ApiCallOption !== DropdownElementData.year) {
        this.getInfoForUlEvent.emit(ApiCallOption);
      } else {
        this.DropDownElementUlInfo = Array.from(
          { length: 2024 - 1980 + 1 },
          (_, i) => (1980 + i).toString()
        );
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (this.isShown && !clickedElement.closest(`#${this.uniqueId}`)) {
      this.isShown = false;
    }
  }

  @Output() optionPickedEvent = new EventEmitter<{option: string, ApiCallOption: DropdownElementData}>();
  handleLiElementClick(option: string) {
    this.optionPickedEvent.emit({option: option, ApiCallOption: this.divInterfaceData.ApiCallOption});
    this.option = option;
  }
}
