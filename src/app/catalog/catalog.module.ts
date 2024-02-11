import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from "./catalog.component";
import { CarDetailsComponent } from './car-details/car-details.component';
import { CatalogRoutingModule } from "./catalog-routing.module";
import { ToggleCardGroupingComponent } from './toggle-card-grouping/toggle-card-grouping.component';
import { TypeSelectItemComponent } from './type-select-item/type-select-item.component';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CatalogComponent,
    CarDetailsComponent,
    ToggleCardGroupingComponent,
    TypeSelectItemComponent
  ],
  imports: [
    CatalogRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ]
})
export class CatalogModule { }