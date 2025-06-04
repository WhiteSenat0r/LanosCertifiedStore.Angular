import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogComponent } from './catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { SvgIconDisplayComponent } from '../../shared/utils/svg-icon-display.component';
import { CatalogService } from './services/catalog.service';
import { FilterDropdownComponent } from './ui/filter-dropdown/filter-dropdown.component';
import { VehicleDataViewComponent } from './ui/vehicle-data-view/vehicle-data-view.component';
import { ViewModeSelectorsComponent } from './ui/view-mode-selectors/view-mode-selectors.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { FilterPriceByRangeElementsComponent } from './ui/filter-price-by-range-elements/filter-price-by-range-elements.component';
import { ColorPaletteComponent } from './ui/color-palette/color-palette.component';
import { FilterCheckboxesComponent } from './ui/filter-checkboxes/filter-checkboxes.component';
import { ImageErrorDirective } from '../../shared/directives/image-error.directive';
import { TooltipComponent } from '../../shared/ui/tooltip/tooltip.component';
import { TooltipUpsideDownComponent } from '../../shared/ui/tooltip-upside-down/tooltip-upside-down.component';
import { InfoChipsComponent } from './ui/view-mode-selectors/info-chips/info-chips.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListViewVehiclesOptionComponent } from './ui/vehicle-data-view/list-view-vehicles-option/list-view-vehicles-option.component';
import { IconBookmarkMainComponent } from "../../shared/icons/icon-bookmark-main/icon-bookmark-main.component";
import { SortingDropdownComponent } from './ui/view-mode-selectors/sorting-dropdown/sorting-dropdown.component';

@NgModule({
  declarations: [
    CatalogComponent,
    FilterDropdownComponent,
    VehicleDataViewComponent,
    ViewModeSelectorsComponent,
    PaginationComponent,
    FilterPriceByRangeElementsComponent,
    ColorPaletteComponent,
    FilterCheckboxesComponent,
    InfoChipsComponent,
    ListViewVehiclesOptionComponent,
    SortingDropdownComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SvgIconDisplayComponent,
    ImageErrorDirective,
    TooltipComponent,
    TooltipUpsideDownComponent,
    NgxSpinnerModule,
    IconBookmarkMainComponent
],
  providers: [CatalogService],
})
export class CatalogModule {}
