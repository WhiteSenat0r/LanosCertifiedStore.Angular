import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { MainContentAreaComponent } from './ui/main-content-area/main-content-area.component';
import { BrandTilesComponent } from './ui/main-content-area/brand-tiles/brand-tiles.component';
import { CarProposalsCardsComponent } from './ui/main-content-area/car-proposals-cards/car-proposals-cards.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgHeroiconsModule } from "@dimaslz/ng-heroicons";



@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    MainContentAreaComponent,
    BrandTilesComponent,
    CarProposalsCardsComponent
  ],
  imports: [
    CommonModule,
    NgHeroiconsModule
  ],
  exports: [
    HomeComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
