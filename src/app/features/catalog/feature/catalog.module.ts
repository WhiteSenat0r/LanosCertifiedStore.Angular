import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogComponent } from './catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { SvgIconDisplayComponent } from '../../../shared/utils/svg-icon-display.component';
import { CatalogService } from '../services/catalog.service';

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, CatalogRoutingModule, SvgIconDisplayComponent],
  exports: [CatalogComponent],
  providers: [CatalogService]
})
export class CatalogModule {}
