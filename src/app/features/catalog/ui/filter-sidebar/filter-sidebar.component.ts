import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
})
export class FilterSidebarComponent {

  items: string[] = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ];

  @Input() brands$!: Observable<Brand[]>;
}
