import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CarItemComponentComponent } from './car-item-component/car-item-component.component';
import { OptionSelectItemComponent } from './option-select-item/option-select-item.component';
import { SortSelectTypeComponent } from './sort-select-type/sort-select-type.component';
import { ChangeViewGridComponent } from './change-view-grid/change-view-grid.component';

// Angular Material модулі
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    CommonModule,
    HttpClientModule,
    SharedModule,
    CatalogRoutingModule,

    // Angular Material модулі
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatAutocompleteModule
  ]
})
export class CatalogModule { }