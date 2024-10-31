import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  iconColor: string = 'portGore-700';
  searchIconColor: string = 'kimberly-50';
  nameOfIcon: string = 'search-short-stick';

  onIconHover(isHovered: boolean) {
    this.iconColor = isHovered ? 'portGore-600' : 'portGore-700';
  }
}
