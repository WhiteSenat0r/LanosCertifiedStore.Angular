import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CatalogComponent} from "./catalog.component";
import {CarDetailsComponent} from "./car-details/car-details.component";

const routes: Routes = [
  {path: '', component: CatalogComponent},
  {path: ':id', component: CarDetailsComponent, data: {breadcrumb: {alias:'vehicleElement'}}},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CatalogRoutingModule { }
