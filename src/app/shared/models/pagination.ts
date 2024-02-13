import { Vehicle } from "./vehicle";

export interface Pagination<T>{
    pageIndex: number;
    totalItemsQuantity: number;
    currentPageItemsQuantity: number;

    data: T
  }
  