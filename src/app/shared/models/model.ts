import { Type } from "./type";

export interface Model {

    vehicleBrand: string;
    id: string;
    name: string;
    availableTypes: Type[];
  }
  