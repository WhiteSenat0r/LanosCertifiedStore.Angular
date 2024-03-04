import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-catalog-footer',
  templateUrl: './catalog-footer.component.html',
  styleUrls: ['./catalog-footer.component.css'],
})
export class CatalogFooterComponent {
  optionsArr: number[] = [10, 20, 30, 50];

  @Input() itemsPerPage: number = 0;
  @Input() totalCountItems: number = 0;
  @Input() pageNumber: number = 0;

  @Output() pageNumberChange: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();
  @Output() pageSizeChange: EventEmitter<any | null> = new EventEmitter<
    any | null
  >();

  handlePageChangedEvent(page: number) {
    if (this.pageNumber !== page) {
      this.pageNumber = page;
    }

    this.pageNumberChange.emit(this.pageNumber);

    window.scrollTo(0, 0);
  }

  onOptionSelected(event: any) {
    if (event.target.value) {
      this.pageSizeChange.emit(event.target.value);
    }

    window.scrollTo(0, 0);
  }
}
