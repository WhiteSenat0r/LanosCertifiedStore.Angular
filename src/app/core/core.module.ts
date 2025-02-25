import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { SvgIconDisplayComponent } from '../shared/utils/svg-icon-display.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SvgIconDisplayComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
  ]
})
export class CoreModule { }
