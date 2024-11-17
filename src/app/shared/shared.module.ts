import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDefaultComponent } from './ui/slider-default/slider-default.component';
import { CoreModule } from "../core/core.module";
import { SliderLightComponent } from './ui/slider-light/slider-light.component';
import { AppendTextPipe } from './pipes/append-text.pipe';



@NgModule({
  declarations: [
    SliderDefaultComponent,
    SliderLightComponent,
    AppendTextPipe
  ],
  imports: [
    CommonModule,
    CoreModule
],
  exports:[
    SliderDefaultComponent,
    SliderLightComponent,
    AppendTextPipe
  ]
})
export class SharedModule { }
