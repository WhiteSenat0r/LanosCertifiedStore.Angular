import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { FilterSidebarComponent } from './ui/filter-sidebar/filter-sidebar.component';
import { HeaderComponent } from './ui/header/header.component';
import { CarGridComponent } from './ui/car-grid/car-grid.component';
import { CarItemComponent } from './ui/car-item/car-item.component';
import { MakeModelFilterComponent } from './ui/filter-sidebar/make-model-filter/make-model-filter.component';

@NgModule({
  declarations: [
    CatalogComponent,
    FilterSidebarComponent,
    HeaderComponent,
    CarGridComponent,
    CarItemComponent,
    MakeModelFilterComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule { 
}
