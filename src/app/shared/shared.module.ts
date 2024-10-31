import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDefaultComponent } from './ui/slider-default/slider-default.component';
import { CoreModule } from "../core/core.module";



@NgModule({
  declarations: [
    SliderDefaultComponent
  ],
  imports: [
    CommonModule,
    CoreModule
],
  exports:[
    SliderDefaultComponent
  ]
})
export class SharedModule { }
