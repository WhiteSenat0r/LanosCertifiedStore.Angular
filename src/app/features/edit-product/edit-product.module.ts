import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProductRoutingModule } from './edit-product-routing.module';
import { EditProductComponent } from './edit-product.component';
import { InfoTitleComponent } from './ui/info-title/info-title.component';

@NgModule({
  declarations: [EditProductComponent, InfoTitleComponent],
  imports: [CommonModule, EditProductRoutingModule],
})
export class EditProductModule {}
