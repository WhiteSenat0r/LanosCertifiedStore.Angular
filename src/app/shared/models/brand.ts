import { Model } from "./model";

export interface Brand {
  id: string;
  models: Model[];
  name: string;
}
