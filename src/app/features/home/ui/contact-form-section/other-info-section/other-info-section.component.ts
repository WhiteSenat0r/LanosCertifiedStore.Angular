import { Component } from '@angular/core';

@Component({
  selector: 'app-other-info-section',
  templateUrl: './other-info-section.component.html',
  styleUrl: './other-info-section.component.css'
})
export class OtherInfoSectionComponent {
  handleIconClick(option: string)
  {
    if(option === 'facebook')
    {
      window.open('https://www.facebook.com/','_blank');
    }
    if(option === 'twitter')
    {
      window.open('https://x.com/?lang=en', '_blank');
    }
    if(option === 'youtube')
    {
      window.open('https://www.youtube.com/', '_blank');
    }
    if(option === 'instagram')
    {
      window.open('https://www.instagram.com/', '_blank');
    }
  }
}
