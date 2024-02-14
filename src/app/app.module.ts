import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { ModalModule } from 'ngx-bootstrap/modal';

import { AddcarformModule } from './addcarform/addcarform.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule,

    ModalModule,

    AddcarformModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
