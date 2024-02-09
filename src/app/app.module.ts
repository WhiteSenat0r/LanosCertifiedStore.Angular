import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CatalogpageComponent} from "./components/catalogpage/catalogpage.component";
import { CarinfopageComponent } from './components/carinfopage/carinfopage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
@NgModule({
  declarations: [
    AppComponent,
    CatalogpageComponent,
    CarinfopageComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
