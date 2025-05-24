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
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { DropdownHeaderData } from '../../../../models/interfaces/DropdownHeaderData.interface';
import { DropdownElementData } from '../../../../models/enums/DropdownElementData.enum';

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
export class DropdownElementComponent {
  @Input() divInterfaceData!: DropdownHeaderData;
  @Input() DropDownElementUlInfo?: Array<{ id: string; name: string }>;
  @Output() getInfoForUlEvent: EventEmitter<DropdownElementData> =
    new EventEmitter<DropdownElementData>();
  uniqueId: string = `dropdown-${Math.random().toString(36).slice(2, 11)}`;
  isShown: boolean = false;

  option: { id: string; name: string } | number = 0;

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
          (_, i) => {
            const year = (1980 + i).toString();
            return { id: year, name: year };
          }
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

  @Output() optionPickedEvent = new EventEmitter<{
    option: { id: string; name: string } | number;
    ApiCallOption: DropdownElementData;
  }>();
  handleLiElementClick(option: { id: string; name: string } | number) {
    this.optionPickedEvent.emit({
      option: option,
      ApiCallOption: this.divInterfaceData.ApiCallOption,
    });

    this.option = option
  }

  public isOptionObject(option: any): option is { id: string; name: string } {
    return typeof option === 'object' && 'name' in option;
  }
}
