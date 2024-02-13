import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from "./catalog.component";
import { CarDetailsComponent } from './car-details/car-details.component';
import { CatalogRoutingModule } from "./catalog-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { CarItemComponentComponent } from './car-item-component/car-item-component.component';
import { OptionSelectItemComponent } from './option-select-item/option-select-item.component';
import { SortSelectTypeComponent } from './sort-select-type/sort-select-type.component';
import { ChangeViewGridComponent } from './change-view-grid/change-view-grid.component';

@NgModule({
  declarations: [
    CatalogComponent,
    CarDetailsComponent,
    CarItemComponentComponent,
    OptionSelectItemComponent,
    SortSelectTypeComponent,
    ChangeViewGridComponent,
  ],
  imports: [
    CatalogRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class CatalogModule { }