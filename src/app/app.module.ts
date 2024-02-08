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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HomepagebannerComponent,
    SearchbarComponent,
    CatalogpageComponent,
    TilehomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
