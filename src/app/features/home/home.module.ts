import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TypeExhibitSectionComponent } from './ui/type-exhibit-section/type-exhibit-section.component';
import { SharedModule } from '../../shared/shared.module';
import { HeroSectionComponent } from './ui/hero-section/hero-section.component';
import { CoreModule } from "../../core/core.module";


@NgModule({
  declarations: [
    HomeComponent,
    TypeExhibitSectionComponent,
    HeroSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
],
  exports: [
    HomeComponent
  ],
})
export class HomeModule { }
