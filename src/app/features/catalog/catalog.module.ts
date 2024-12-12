import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogComponent } from './feature/catalog.component';
import { CatalogRoutingModule } from './feature/catalog-routing.module';
import { SvgIconDisplayComponent } from '../../shared/utils/svg-icon-display.component';
import { CatalogService } from './services/catalog.service';
import { FilterDropdownComponent } from './ui/filter-dropdown/filter-dropdown.component';
import { VehicleDataViewComponent } from './ui/vehicle-data-view/vehicle-data-view.component';
import { ViewModeSelectorsComponent } from './ui/view-mode-selectors/view-mode-selectors.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { FilterPriceByRangeElementsComponent } from './ui/filter-price-by-range-elements/filter-price-by-range-elements.component';
import { ColorPaletteComponent } from './ui/color-palette/color-palette.component';
import { FilterCheckboxesComponent } from './ui/filter-checkboxes/filter-checkboxes.component';
@NgModule({
  declarations: [CatalogComponent, FilterDropdownComponent, VehicleDataViewComponent, ViewModeSelectorsComponent, PaginationComponent, FilterPriceByRangeElementsComponent, ColorPaletteComponent, FilterCheckboxesComponent],
  imports: [CommonModule, CatalogRoutingModule, SvgIconDisplayComponent],
  exports: [CatalogComponent],
  providers: [CatalogService],
})
export class CatalogModule {}
