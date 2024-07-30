import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';
import { MaincharacteristicsComponent } from './filters/maincharacteristics/maincharacteristics.component';
import { TechnicalparametersComponent } from './filters/technicalparameters/technicalparameters.component';
import { TransmissionComponent } from './filters/transmission/transmission.component';

@NgModule({
  declarations: [
    AppComponent,
    MaincharacteristicsComponent,
    TechnicalparametersComponent,
    TransmissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
