export interface Pagination<T>{
    totalItemsCount: number;
    totalFilteredItemsCount: number;
    currentPageItemsQuantity: number;
    pageIndex: number;

    items: T[];
  }
  