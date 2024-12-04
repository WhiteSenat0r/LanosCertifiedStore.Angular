import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  avatars: string[] = [
    'assets/images/team/DA.jpg',
    'assets/images/team/N.jpg',
    'assets/images/team/DM.jpg',
    'assets/images/team/S.jpg',
  ];
  socialMediaSvgIconLinks: string[] = [
    'telegram-full',
    'instagram-full',
    'email-full',
    'telephone-full',
  ];

  handleIconClick(option: string) {
    if (option === 'telegram-full') {
      window.open('https://web.telegram.org/a/', '_blank');
    }
    if (option === 'instagram-full') {
      window.open('https://www.instagram.com/', '_blank');
    }
    if (option === 'email-full') {
      window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
    }
    if (option === 'telephone-full') {
      window.open('https://www.google.com/search?q=telephone&rlz=1C1GCEA_enUA1105UA1105&oq=telephone&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDIzODJqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8', '_blank');
    }
  }
}
