import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-contact-form-section',
  templateUrl: './contact-form-section.component.html',
  styleUrl: './contact-form-section.component.css',
  animations: [
    trigger('slideUp', [
      state(
        'open',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateY(20%)',
          opacity: 0,
        })
      ),
      transition('closed => open', [animate('150ms ease-in-out')]),
      transition('open => closed', [animate('150ms ease-in-out')]),
    ]),
  ],
})
export class ContactFormSectionComponent {
  items: string[] = [
    'first item',
    'second item',
    'third item',
    'Інформативний',
  ];
  countries: string[] = [
    'Україна',
    'Польща',
    'Німеччина',
    'Чехія',
    'Молдова',
    'Велика Британія',
  ];
  showRequests: boolean = false;
  showCountries: boolean = false;

  requestPurpose: string = '';
  country: string = '';

  handleShowRequests() {
    this.showRequests = !this.showRequests;
  }

  handleRequestOptionClick(item: any) {
    this.showRequests = false;
    this.requestPurpose = item;
  }

  handleShowCountries() {
    this.showCountries = !this.showCountries;
  }

  handleCountryOptionClick(country: string) {
    this.showCountries = false;
    this.country = country;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (
      this.showCountries &&
      !clickedElement.closest('#country-dropdown-element')
    ) {
      this.showCountries = false;
    }

    if (
      this.showRequests &&
      !clickedElement.closest('#request-type-dropdown-element')
    ) {
      this.showRequests = false;
    }
  }
}
