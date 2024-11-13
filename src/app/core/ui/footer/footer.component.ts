import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  avatars: string[] = ['assets/images/team/DA.jpg', 'assets/images/team/N.jpg', 'assets/images/team/DM.jpg', "assets/images/team/S.jpg"];
  socialMediaSvgIconLinks: string[] = ["telegram-full", "instagram-full", "email-full", "telephone-full"]
}
