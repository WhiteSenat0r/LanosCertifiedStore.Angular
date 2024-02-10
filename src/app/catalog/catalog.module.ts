import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogComponent} from "./catalog.component";
import { CarDetailsComponent } from './car-details/car-details.component';



@NgModule({
  declarations: [
    CatalogComponent,
    CarDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CatalogModule { }
