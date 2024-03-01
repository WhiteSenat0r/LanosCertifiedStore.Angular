import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleoperationRoutingModule } from './vehicleoperation-routing.module';
import { AddVehiclePhotoComponent } from './add-vehicle-photo/add-vehicle-photo.component';



@NgModule({
  declarations: [
    AddVehicleComponent,
    AddVehiclePhotoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VehicleoperationRoutingModule
  ]
})
export class VehicleoperateModule { }
