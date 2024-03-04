import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CarItemComponentComponent } from './car-item-component/car-item-component.component';
import { SortSelectTypeComponent } from './sort-select-type/sort-select-type.component';
import { ChangeViewGridComponent } from './change-view-grid/change-view-grid.component';

// Angular Material модулі
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MainCarouselComponent } from './car-details/main-carousel/main-carousel.component';
import { MultiplyItemsCarouselComponent } from './car-details/multiply-items-carousel/multiply-items-carousel.component';
import { TableItemsComponent } from './car-details/table-items/table-items.component';
import { CharacteristicsComponent } from './car-details/characteristics/characteristics.component';
import { PriceSelectComponent } from './price-select/price-select.component';

//ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CatalogFooterComponent } from './catalog-footer/catalog-footer.component';
import { CatalogHeaderComponent } from './catalog-header/catalog-header.component';
@NgModule({
  declarations: [
    CatalogComponent,
    CatalogFooterComponent,
    CarDetailsComponent,
    CarItemComponentComponent,
    SortSelectTypeComponent,
    ChangeViewGridComponent,
    DatePickerComponent,
    MainCarouselComponent,
    MultiplyItemsCarouselComponent,
    TableItemsComponent,
    CharacteristicsComponent,
    PriceSelectComponent,
    CatalogHeaderComponent,
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
    MatAutocompleteModule,
    MatIconModule,

    //ngx-bootstrap
    BsDatepickerModule
  ]
})
export class CatalogModule { }
