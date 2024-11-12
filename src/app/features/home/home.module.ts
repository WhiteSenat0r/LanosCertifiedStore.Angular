import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TypeExhibitSectionComponent } from './ui/type-exhibit-section/type-exhibit-section.component';
import { SharedModule } from '../../shared/shared.module';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { CoreModule } from "../../core/core.module";
import { TopPropositionsSectionComponent } from './ui/top-propositions-section/top-propositions-section.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    TypeExhibitSectionComponent,
    HeroSectionComponent,
    TopPropositionsSectionComponent,
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
