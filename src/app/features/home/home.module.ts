import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TypeExhibitSectionComponent } from './ui/type-exhibit-section/type-exhibit-section.component';
import { SharedModule } from '../../shared/shared.module';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { CoreModule } from "../../core/core.module";
import { TopPropositionsSectionComponent } from './ui/top-propositions-section/top-propositions-section.component';
import { RouterModule } from '@angular/router';
import { AdBlockSectionComponent } from './ui/ad-block-section/ad-block-section.component';
import { ContactFormSectionComponent } from './ui/contact-form-section/contact-form-section.component';
import { AdvancedSearchComponent } from './ui/advanced-search/advanced-search.component';
import { OtherInfoSectionComponent } from './ui/contact-form-section/other-info-section/other-info-section.component';


@NgModule({
  declarations: [
    HomeComponent,
    TypeExhibitSectionComponent,
    HeroSectionComponent,
    TopPropositionsSectionComponent,
    AdBlockSectionComponent,
    ContactFormSectionComponent,
    AdvancedSearchComponent,
    OtherInfoSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule
],
  exports: [
    HomeComponent
  ],
})
export class HomeModule { }
