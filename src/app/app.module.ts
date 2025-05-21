import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import { provideHttpClient } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbHolderComponent } from './shared/ui/breadcrumb-holder/breadcrumb-holder.component';
import { SvgIconDisplayComponent } from './shared/utils/svg-icon-display.component';

import { AuthModule } from './core/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NgxSliderModule,
    FormsModule,
    NgxPaginationModule,
    BreadcrumbHolderComponent,
    SvgIconDisplayComponent,
     AuthModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
