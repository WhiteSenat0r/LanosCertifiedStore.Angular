import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleoperationRoutingModule } from './vehicleoperation-routing.module';
import { AddVehiclePhotoComponent } from './add-vehicle-photo/add-vehicle-photo.component';
import { NgxEditorModule } from 'ngx-editor';
import { MatDividerModule } from '@angular/material/divider';
import { InputRegularModule } from 'src/app/shared/components/input-regular/input-regular.module';
import { DropdownTypeaheadModule } from 'src/app/shared/components/dropdown-typeahead/dropdown-typeahead.module';



@NgModule({
  declarations: [
    AddVehicleComponent,
    AddVehiclePhotoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VehicleoperationRoutingModule,
    NgxEditorModule,
    MatDividerModule,
    InputRegularModule,
    DropdownTypeaheadModule
  ]
})
export class VehicleoperateModule { }
