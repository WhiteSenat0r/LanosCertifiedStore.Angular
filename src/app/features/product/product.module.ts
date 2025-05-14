import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ThumbnailsCarouselComponent } from './ui/thumbnails-carousel/thumbnails-carousel.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { SvgIconDisplayComponent } from "../../shared/utils/svg-icon-display.component";
import { DetailedDescriptionComponent } from './ui/detailed-description/detailed-description.component';

@NgModule({
  declarations: [ProductComponent, ThumbnailsCarouselComponent, ProductDetailsComponent, DetailedDescriptionComponent],
  imports: [CommonModule, ProductRoutingModule, SvgIconDisplayComponent],
})
export class ProductModule {}
