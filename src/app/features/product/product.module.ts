import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ThumbnailsCarouselComponent } from './ui/thumbnails-carousel/thumbnails-carousel.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { SvgIconDisplayComponent } from "../../shared/utils/svg-icon-display.component";
import { DetailedDescriptionComponent } from './ui/detailed-description/detailed-description.component';
import { IconBookmarkMainComponent } from "../../shared/icons/icon-bookmark-main/icon-bookmark-main.component";
import { OwnerCardComponent } from './ui/product-details/owner-card/owner-card.component';
import { SimilarProductsCarouselComponent } from './ui/similar-products-carousel/similar-products-carousel.component';

@NgModule({
  declarations: [ProductComponent, ThumbnailsCarouselComponent, ProductDetailsComponent, DetailedDescriptionComponent, OwnerCardComponent, SimilarProductsCarouselComponent],
  imports: [CommonModule, ProductRoutingModule, SvgIconDisplayComponent, IconBookmarkMainComponent],
})
export class ProductModule {}
