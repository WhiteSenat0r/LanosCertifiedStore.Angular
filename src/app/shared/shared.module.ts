import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarcardComponent } from './carcard/carcard.component';



@NgModule({
  declarations: [
    CarcardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CarcardComponent
  ]
})
export class SharedModule { }
