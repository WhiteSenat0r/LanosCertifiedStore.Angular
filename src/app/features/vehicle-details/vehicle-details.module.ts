import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDetailsRoutingModule } from './vehicle-details-routing.module';
import { VehicleDetailsComponent } from './vehicle-details.component';


@NgModule({
  declarations: [
    VehicleDetailsComponent
  ],
  imports: [
    CommonModule,
    VehicleDetailsRoutingModule
  ],
})
export class VehicleDetailsModule { }
