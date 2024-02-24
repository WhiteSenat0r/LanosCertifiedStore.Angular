import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {
  @Input() totalCountItems?: number;
  @Input() itemsPerPage?: number;
  @Output() pageChanged = new EventEmitter<number>();

  onPageChanged(event: PageChangedEvent): void
  {
    this.pageChanged.emit(event.page);
  }
}
