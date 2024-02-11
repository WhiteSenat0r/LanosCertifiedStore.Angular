import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilehomepageComponent } from './tilehomepage/tilehomepage.component';
import { CardsComponent } from './cards/cards.component';
import { HomepagebannerComponent } from './homepagebanner/homepagebanner.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { HomeComponent } from './home.component';
import {RouterLink, RouterModule} from "@angular/router";
import {CatalogRoutingModule} from "../catalog/catalog-routing.module";



@NgModule({
  declarations: [
    TilehomepageComponent,
    CardsComponent,
    HomepagebannerComponent,
    SearchbarComponent,
    HomeComponent
  ],
  exports: [
    CardsComponent,
    HomepagebannerComponent,
    SearchbarComponent,
    TilehomepageComponent,
    HomeComponent
  ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterLink,
    ]
})
export class HomeModule { }
