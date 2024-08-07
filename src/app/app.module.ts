import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import { provideHttpClient } from '@angular/common/http';
import { MaincharacteristicsComponent } from './filters/maincharacteristics/maincharacteristics.component';
import { TechnicalparametersComponent } from './filters/technicalparameters/technicalparameters.component';
import { TransmissionComponent } from './filters/transmission/transmission.component';
import { CatalogComponent } from './catalogpage/catalog/catalog.component';
import { CarcardComponent } from './shared/carcard/carcard.component';
import { SidebarComponent } from './catalogpage/sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    MaincharacteristicsComponent,
    TechnicalparametersComponent,
    TransmissionComponent,
    CatalogComponent,
    CarcardComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
