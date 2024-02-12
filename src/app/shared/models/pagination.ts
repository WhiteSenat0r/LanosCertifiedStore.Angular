import { Vehicle } from "./vehicle";

export interface Pagination<T>{
    pageIndex: number;
    count: number;

    data: T
  }
  