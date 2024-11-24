import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { EngineType } from '../../../../../../shared/models/ApiModels/EngineType';

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
          display: 'flex',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          display: 'none',
        })
      ),
      transition('closed => open', [animate('150ms ease-out')]),
      transition('open => closed', [animate('110ms ease-in')]),
    ]),
  ],
})
export class DropdownElementComponent implements OnInit {
  @Input() divInterfaceData!: { iconUrl: string; info: string };
  @Input() DropDownElementUlInfo?: EngineType[];
  @Output() getInfoForUlEvent: EventEmitter<string> = new EventEmitter<string>();
  uniqueId: string = `dropdown-${Math.random().toString(36).slice(2, 11)}`;
  isShown: boolean = false;

  option: string = '';

  ngOnInit() {}
  handleClick() {
    this.isShown = !this.isShown;
    if(this.isShown)
    {
      this.getInfoForUlEvent.emit('lol');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (this.isShown && !clickedElement.closest(`#${this.uniqueId}`)) {
      this.isShown = false;
    }
  }

  handleLiElementClick(option: string) {
    this.option = option;
  }
}
