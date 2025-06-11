import { Component, Input } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';
import { SvgIconDisplayComponent } from '../../../utils/svg-icon-display.component';
@Component({
  selector: 'app-breadcrumb-holder',
  templateUrl: './breadcrumb-holder.component.html',
  styleUrl: './breadcrumb-holder.component.css',
  standalone: true,
  imports: [BreadcrumbComponent, BreadcrumbItemDirective, SvgIconDisplayComponent, CommonModule]
})
export class BreadcrumbHolderComponent {
  @Input({ required: true }) isMainPage!: boolean;
}
