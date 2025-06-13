import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconDisplayComponent } from './shared/utils/svg-icon-display.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthModule } from './core/auth/auth.module';
import { BreadcrumbHolderComponent } from './shared/ui/other/breadcrumb-holder/breadcrumb-holder.component';
import { AuthInterceptor } from './core/auth/interceptor/auth.interceptor';
import { AuthService } from './core/auth/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
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
    NgxSpinnerModule,
    AuthModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
