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
import { OtherInfoSectionComponent } from './ui/contact-form-section/other-info-section/other-info-section.component';
import { AdvancedSearchSectionComponent } from './ui/advanced-search-section/advanced-search-section.component';
import { AdvancedInputsFormComponent } from './ui/advanced-search-section/advanced-inputs-form/advanced-inputs-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownElementComponent } from './ui/advanced-search-section/advanced-inputs-form/dropdown-element/dropdown-element.component';


@NgModule({
  declarations: [
    HomeComponent,
    TypeExhibitSectionComponent,
    HeroSectionComponent,
    TopPropositionsSectionComponent,
    AdBlockSectionComponent,
    ContactFormSectionComponent,
    OtherInfoSectionComponent,
    AdvancedSearchSectionComponent,
    AdvancedInputsFormComponent,
    DropdownElementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    ReactiveFormsModule
],
  exports: [
    HomeComponent
  ],
})
export class HomeModule { }
