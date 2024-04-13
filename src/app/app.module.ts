import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountModule } from './account/account.module';
import { ErrorInterceptor } from './core/intersceptors/error.interceptor';
import { AccountInterceptor } from './core/intersceptors/account.interceptor';
import { AuthGuardService } from './auth-guard.service';
import { HomeModule } from './features/home/home.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'; // Corrected import
import { CatalogState } from './features/catalog/store/catalog.state';
import { environment } from 'src/environments/environments';

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
    AccountModule,
    ModalModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxsModule.forRoot([CatalogState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: AccountInterceptor, multi: true },
     AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
