import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

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
    trigger('enterAnimation', [
      transition(':enter', [
        style({ 
          transform: 'scale(0.7)', 
          opacity: 0 
        }),
        animate('500ms ease-in-out', style({ 
          transform: 'scale(1)', 
          opacity: 1 
        }))
      ])
    ]),
    trigger('appearAnimation', [
      transition(':enter', [
        style({  
          opacity: 0 
        }),
        animate('500ms ease-in-out', style({ 
          opacity: 1 
        }))
      ])
    ])
  ],
})
export class ContactFormSectionComponent implements OnInit {
  submittedForm = false;

  items: string[] = [
    'Інформативний',
    'Роз\'яснювальний',
    'Проблемний',
    'Консультативний',
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

  contactForm!: FormGroup;

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(2000),
      ]),
      country: new FormControl(null, [Validators.required]),
      requestType: new FormControl(null, [Validators.required]),
    });
  }

  handleShowRequests() {
    this.showRequests = !this.showRequests;

    if (!this.contactForm.get('requestType')?.touched) {
      this.contactForm.get('requestType')?.markAsTouched();
    }
  }

  handleRequestOptionClick(item: string) {
    this.showRequests = false;
    this.contactForm.get('requestType')?.setValue(item);
    this.requestPurpose = item;
  }

  handleShowCountries() {
    this.showCountries = !this.showCountries;
    if (!this.contactForm.get('country')?.touched) {
      this.contactForm.get('country')?.markAsTouched();
    }
  }

  handleCountryOptionClick(country: string) {
    this.showCountries = false;
    this.contactForm.get('country')?.setValue(country);
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

  onSubmit() {
    if (this.contactForm.valid) {
      this.submittedForm = true;
      const formData = this.contactForm.value;
      
      // this code is not suitable for this layer of component logic
      emailjs.send(
        'service_9y0hr59', 
        'template_lh1nr7f', 
        {
          name: formData.name,          
          email: formData.email,        
          message: formData.message,   
          country: formData.country, 
          requestType: formData.requestType,
        },
        '3nr0HbEsRNepNQvH2'
      )
      .then((response) => {
        console.log('Email sent successfully!', response);
        this.submittedForm = true;
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
    }
  }
}
