import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { CatalogService } from '../services/catalog.service';
import { Pagination } from 'src/app/shared/models/pagination';
import { CatalogActions } from './catalog.action';
import { CatalogVehicle } from '../models/catalogVehicle';

export interface CatalogStateModel {
  brands: Brand[];
  vehicles: CatalogVehicle[];
  pageNumber: number;
  totalFilteredItemsCount: number;
}

@State<CatalogStateModel>({
  name: 'catalog',
  defaults: {
    brands: [] as Brand[],
    vehicles: [] as CatalogVehicle[],
    pageNumber: 0,
    totalFilteredItemsCount: 0,
  },
})
@Injectable()
export class CatalogState {
  constructor(private catalogService: CatalogService) {}

  @Selector()
  static getBrands(state: CatalogStateModel): Brand[] {
    return state.brands;
  }

  @Selector()
  static getVehicles(state: CatalogStateModel): CatalogVehicle[] {
    return state.vehicles;
  }

  @Action(CatalogActions.LoadBrands)
  LoadBrands({ patchState }: StateContext<CatalogStateModel>): void {
    this.catalogService.getBrands().subscribe({
      next: (response: Pagination<Brand>) => {
        patchState({
          brands: response.items,
        });
      },
      error: (error) => {
        console.error('Error loading brands:', error);
      },
    });
  }

  @Action(CatalogActions.LoadVehicles)
  LoadVehicles(
    { patchState }: StateContext<CatalogStateModel>,
    { payload }: CatalogActions.LoadVehicles
  ): void {
    this.catalogService.getVehicles(payload).subscribe({
      next: (response: Pagination<CatalogVehicle>) => {
        patchState({
          vehicles: response.items,
          pageNumber: response.pageIndex,
          totalFilteredItemsCount: response.totalFilteredItemsCount,
        });
      },
      error: (error) => console.error(error),
    });
  }

  @Action(CatalogActions.ShowInfo)
  ShowInfo(ctx: StateContext<CatalogStateModel>) : void
  {
  }
}
