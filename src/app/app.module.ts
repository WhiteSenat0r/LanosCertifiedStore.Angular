import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import { provideHttpClient } from '@angular/common/http';

import { CatalogComponent } from './catalogpage/catalog/catalog.component';
import { CarcardComponent } from './shared/carcard/carcard.component';
import { SidebarComponent } from './catalogpage/sidebar/sidebar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaginationComponent } from './catalogpage/pagination/pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CarcardComponent,
    SidebarComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NgxSliderModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
