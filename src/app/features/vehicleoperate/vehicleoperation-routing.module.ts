import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddVehiclePhotoComponent } from './add-vehicle-photo/add-vehicle-photo.component';


const routes: Routes = [
  {path: 'addvehicle', component: AddVehicleComponent},
  {path: 'addvehiclephoto/:id', component: AddVehiclePhotoComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VehicleoperationRoutingModule { }
