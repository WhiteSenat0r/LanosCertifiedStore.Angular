import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './ui/footer/footer.component';
import { HeaderComponent } from './ui/header/header.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { SvgIconDisplayComponent } from './utilities/svg-icon-display/svg-icon-display.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    SvgIconDisplayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    SvgIconDisplayComponent
  ]
})
export class CoreModule { }
