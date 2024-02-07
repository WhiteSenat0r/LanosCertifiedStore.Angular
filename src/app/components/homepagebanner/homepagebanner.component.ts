import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepagebanner',
  templateUrl: './homepagebanner.component.html',
  styleUrls: ['./homepagebanner.component.css']
})
export class HomepagebannerComponent {
userIcon = faUser
likeIcon = faHeart
}
