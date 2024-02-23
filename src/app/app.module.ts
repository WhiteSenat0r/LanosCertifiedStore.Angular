import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AddcarformModule } from './addcarform/addcarform.module';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TabletabsComponent } from './dashboard/tabletabs/tabletabs.component';

import { AdminsearchbarComponent } from './dashboard/adminsearchbar/adminsearchbar.component';
import { ColortabletabsComponent } from './dashboard/colortabletabs/colortabletabs.component';
import { BrandtabletabsComponent } from './dashboard/brandtabletabs/brandtabletabs.component';

import { ModeltabletabsComponent } from './dashboard/modeltabletabs/modeltabletabs.component';

import { AccountModule } from './account/account.module';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    TabletabsComponent,
    AdminsearchbarComponent,
    ColortabletabsComponent,
    BrandtabletabsComponent,
    ModeltabletabsComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule,
    AccountModule,

    ModalModule,

    MatDatepickerModule,
    MatNativeDateModule,
    AddcarformModule,
    MatInputModule,
    MatAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
