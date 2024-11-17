import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import { provideHttpClient } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {NgxPaginationModule} from 'ngx-pagination';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NgxSliderModule,
    FormsModule,
    NgxPaginationModule,
    BreadcrumbComponent, BreadcrumbItemDirective
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
