import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TypeExhibitSectionComponent } from './ui/type-exhibit-section/type-exhibit-section.component';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { CoreModule } from '../../core/core.module';
import { TopPropositionsSectionComponent } from './ui/top-propositions-section/top-propositions-section.component';
import { RouterModule } from '@angular/router';
import { AdBlockSectionComponent } from './ui/ad-block-section/ad-block-section.component';
import { ContactFormSectionComponent } from './ui/contact-form-section/contact-form-section.component';
import { OtherInfoSectionComponent } from './ui/contact-form-section/other-info-section/other-info-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SliderDefaultComponent } from './ui/slider-default/slider-default.component';
import { SliderLightComponent } from './ui/slider-light/slider-light.component';
import { AppendTextPipe } from '../../shared/pipes/append-text.pipe';
import { SvgIconDisplayComponent } from '../../shared/utils/svg-icon-display.component';
import { HomeService } from './services/home.service';
import { DropdownElementComponent } from './ui/fast-search-section/fast-inputs-form/dropdown-element/dropdown-element.component';
import { FastSearchSectionComponent } from './ui/fast-search-section/fast-search-section.component';
import { FastInputsFormComponent } from './ui/fast-search-section/fast-inputs-form/fast-inputs-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    HomeComponent,
    TypeExhibitSectionComponent,
    HeroSectionComponent,
    TopPropositionsSectionComponent,
    AdBlockSectionComponent,
    ContactFormSectionComponent,
    OtherInfoSectionComponent,
    DropdownElementComponent,
    SliderDefaultComponent,
    SliderLightComponent,
    FastSearchSectionComponent,
    FastInputsFormComponent,
  ],
  imports: [
    CommonModule,
    AppendTextPipe,
    CoreModule,
    RouterModule,
    ReactiveFormsModule,
    SvgIconDisplayComponent,
    NgOptimizedImage,
    NgxSpinnerModule,
  ],
  exports: [HomeComponent],
  providers: [HomeService],
})
export class HomeModule {}
