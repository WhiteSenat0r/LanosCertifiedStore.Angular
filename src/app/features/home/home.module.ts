import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { MainContentAreaComponent } from './ui/main-content-area/main-content-area.component';
import { BrandTilesComponent } from './ui/main-content-area/brand-tiles/brand-tiles.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    MainContentAreaComponent,
    BrandTilesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
