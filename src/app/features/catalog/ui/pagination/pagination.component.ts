import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  // Inputs
  @Input({ required: true }) currentPage!: number;
  totalPages = input.required<number>();

  // Outputs
  onPageChangeEvent = output<number>();

  // Component states
  pageNumbers = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, index) => index + 1);
  });


  /**
 * Emits a page change event when a specific page number is selected.
 *
 * @param {number} index - The zero-based page index.
 * 
 * - The function adds 1 to the index to convert it to a one-based page number
 * before emitting the `onPageChangeEvent`.
 */
  onPageChange(index: number) {
    this.onPageChangeEvent.emit(index + 1);
  }

  /**
   * Handles the pagination button click event for arrows.
   *
   * @param {string} option - The pagination arrow action ('previous' or 'next').
   * 
   *
   * - If 'previous' is clicked and the current page is **not** the first page, it emits an event to navigate to the previous page.
   * - If 'next' is clicked and the current page is **not** the last page, it emits an event to navigate to the next page.
   */
  onChangePageButtonClick(option: string) {
    switch (option) {
      case 'previous':
        if (this.currentPage !== 1) {
          this.onPageChangeEvent.emit(this.currentPage - 1);
        }
        break;
      case 'next':
        if (this.currentPage !== this.totalPages()) {
          this.onPageChangeEvent.emit(this.currentPage + 1);
        }
        break;
    }
  }
}
