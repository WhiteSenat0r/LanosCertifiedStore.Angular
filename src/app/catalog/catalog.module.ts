import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogComponent} from "./catalog.component";
import { CarDetailsComponent } from './car-details/car-details.component';
import {CatalogRoutingModule} from "./catalog-routing.module";
import { CarItemComponent } from './car-item/car-item.component';
import { ToggleCardGroupingComponent } from './toggle-card-grouping/toggle-card-grouping.component';
import { TypeSelectItemComponent } from './type-select-item/type-select-item.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    CatalogComponent,
    CarDetailsComponent,
    CarItemComponent,
    ToggleCardGroupingComponent,
    TypeSelectItemComponent
  ],
  imports: [
    CatalogRoutingModule,
    CommonModule
  ]
})
export class CatalogModule { }
