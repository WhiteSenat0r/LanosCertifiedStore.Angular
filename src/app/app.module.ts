import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepagebannerComponent } from './components/homepagebanner/homepagebanner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import {CatalogpageComponent} from "./components/catalogpage/catalogpage.component";
import { TilehomepageComponent } from './components/tilehomepage/tilehomepage.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarinfopageComponent } from './components/carinfopage/carinfopage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { AddcarformComponent } from './components/addcarform/addcarform.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HomepagebannerComponent,
    SearchbarComponent,
    CatalogpageComponent,
    TilehomepageComponent,
    CardsComponent,
    CarinfopageComponent,
    AddcarformComponent,
    CarinfopageComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
