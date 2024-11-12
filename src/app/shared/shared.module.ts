import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDefaultComponent } from './ui/slider-default/slider-default.component';
import { CoreModule } from "../core/core.module";
import { SliderLightComponent } from './ui/slider-light/slider-light.component';



@NgModule({
  declarations: [
    SliderDefaultComponent,
    SliderLightComponent
  ],
  imports: [
    CommonModule,
    CoreModule
],
  exports:[
    SliderDefaultComponent,
    SliderLightComponent
  ]
})
export class SharedModule { }
