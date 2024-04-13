import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-make-model-filter',
  templateUrl: './make-model-filter.component.html',
  styleUrls: ['./make-model-filter.component.css']
})
export class MakeModelFilterComponent {
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
