import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnChanges {
  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) totalPages!: number;
  pageNumbers: Array<number> = [];
  @Output() onPageChangeEvent = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.pageNumbers = Array.from(
        { length: this.totalPages },
        (_, index) => index + 1
      );
    }
  }
  onPageChange(index: number) {
    this.onPageChangeEvent.emit(index + 1);
  }
  onChangePageButtonClick(option: string) {
    switch (option) {
      case 'previous':
        if (this.currentPage !== 1) {
          this.onPageChangeEvent.emit(this.currentPage - 1);
        }
        break;
      case 'next':
        if (this.currentPage !== this.totalPages) {
          this.onPageChangeEvent.emit(this.currentPage + 1);
        }
        break;
    }
  }
}
