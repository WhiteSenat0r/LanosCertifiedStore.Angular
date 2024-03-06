import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilehomepageComponent } from './tilehomepage/tilehomepage.component';
import { CardsComponent } from './cards/cards.component';
import { HomepagebannerComponent } from './homepagebanner/homepagebanner.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { RatigComponent } from './ratig/ratig.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    TilehomepageComponent,
    CardsComponent,
    HomepagebannerComponent,
    SearchbarComponent,
    HomeComponent,
    RatigComponent,
  ],
  exports: [
    CardsComponent,
    HomepagebannerComponent,
    SearchbarComponent,
    TilehomepageComponent,
    HomeComponent,
    RatigComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, RouterLink],
})
export class HomeModule {}
