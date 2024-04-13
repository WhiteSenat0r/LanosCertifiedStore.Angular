import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Brand } from 'src/app/shared/models/brand';
import { Observable } from 'rxjs';
import { CatalogActions } from './store/catalog.action';
import { CatalogParams } from './models/catalogParams';
import { CatalogState } from './store/catalog.state';
import { CatalogVehicle } from './models/catalogVehicle';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  @Select(CatalogState.getBrands) brands$!: Observable<Brand[]>;
  @Select(CatalogState.getVehicles) vehicles$!: Observable<CatalogVehicle[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getBrands();
    this.getVehicles();
  }

  getBrands(): void {
    this.store.dispatch(new CatalogActions.LoadBrands());
  }

  getVehicles() {
    this.store.dispatch(new CatalogActions.LoadVehicles(new CatalogParams()));
  }

  ShowInfo() {
    this.store.dispatch(new CatalogActions.ShowInfo());
  }
}
