import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MatIconModule } from '@angular/material/icon';
import { TestErrorsComponent } from './components/test-errors/test-errors.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
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
