import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogComponent} from "./catalog.component";
import { CarDetailsComponent } from './car-details/car-details.component';
import {CatalogRoutingModule} from "./catalog-routing.module";



@NgModule({
  declarations: [
    CatalogComponent,
    CarDetailsComponent
  ],
  imports: [
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
