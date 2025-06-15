import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ThumbnailsCarouselComponent } from './ui/thumbnails-carousel/thumbnails-carousel.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { SvgIconDisplayComponent } from '../../shared/utils/svg-icon-display.component';
import { DetailedDescriptionComponent } from './ui/detailed-description/detailed-description.component';
import { IconBookmarkMainComponent } from '../../shared/icons/icon-bookmark-main/icon-bookmark-main.component';
import { OwnerCardComponent } from './ui/product-details/owner-card/owner-card.component';
import { SimilarProductsCarouselComponent } from './ui/similar-products-carousel/similar-products-carousel.component';
import { IconDescriptionComponent } from './icons/icon-description/icon-description.component';
import { IconOutlinedAnnotationComponent } from './icons/icon-outlined-annotation/icon-outlined-annotation.component';
import { IconOutlineZoomInComponent } from './icons/icon-outline-zoom-in/icon-outline-zoom-in.component';
import { OtherModelsComponent } from './ui/other-models/other-models.component';
import { OutlineArrowRightComponent } from './icons/outline-arrow-right/outline-arrow-right.component';
import { IconOutlineMailComponent } from './icons/icon-outline-mail/icon-outline-mail.component';
import { IconMailPinComponent } from './icons/icon-mail-pin/icon-mail-pin.component';
import { IconOutlineUserComponent } from './icons/icon-outline-user/icon-outline-user.component';
import { IconPhoneComponent } from './icons/icon-phone/icon-phone.component';
import { VehicleDetailsComponent } from './ui/product-details/vehicle-details/vehicle-details.component';
import { ImageErrorDirective } from '../../shared/directives/image-error.directive';

@NgModule({
  declarations: [
    ProductComponent,
    ThumbnailsCarouselComponent,
    ProductDetailsComponent,
    DetailedDescriptionComponent,
    OwnerCardComponent,
    SimilarProductsCarouselComponent,
    IconDescriptionComponent,
    IconOutlinedAnnotationComponent,
    IconOutlineZoomInComponent,
    OtherModelsComponent,
    OutlineArrowRightComponent,
    IconOutlineMailComponent,
    IconMailPinComponent,
    IconOutlineUserComponent,
    IconPhoneComponent,
    VehicleDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SvgIconDisplayComponent,
    IconBookmarkMainComponent,
    ImageErrorDirective,
  ],
})
export class ProductModule {}
