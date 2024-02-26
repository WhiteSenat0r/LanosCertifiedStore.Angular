import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MatIconModule } from '@angular/material/icon';
import { TestErrorsComponent } from './test-errors/test-errors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SectionHeaderComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    BreadcrumbModule,
    MatIconModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ]
})
export class CoreModule { }
