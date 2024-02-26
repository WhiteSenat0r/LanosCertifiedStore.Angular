import { Vehicle } from "./vehicle";

export interface Pagination<T>{
    totalItemsQuantity: number;
    totalFilteredItemsQuantity: number;
    currentPageItemsQuantity: number;
    pageIndex: number;

    items: T
  }
  