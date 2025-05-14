export interface PaginatedResult<T>{
    items: T[];
    currentPageItemsQuantity: number;
    pageIndex: number;
}