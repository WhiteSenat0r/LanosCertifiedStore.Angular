import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogComponent } from './feature/catalog.component';
import { CatalogRoutingModule } from './feature/catalog-routing.module';
import { SvgIconDisplayComponent } from '../../shared/utils/svg-icon-display.component';
import { CatalogService } from './services/catalog.service';
import { FilterDropdownComponent } from './ui/filter-dropdown/filter-dropdown.component';
import { VehicleDataViewComponent } from './ui/vehicle-data-view/vehicle-data-view.component';
import { ViewModeSelectorsComponent } from './ui/view-mode-selectors/view-mode-selectors.component';

@NgModule({
  declarations: [CatalogComponent, FilterDropdownComponent, VehicleDataViewComponent, ViewModeSelectorsComponent],
  imports: [CommonModule, CatalogRoutingModule, SvgIconDisplayComponent],
  exports: [CatalogComponent],
  providers: [CatalogService],
})
export class CatalogModule {}
