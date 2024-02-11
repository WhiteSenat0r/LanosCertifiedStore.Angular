import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CatalogComponent} from "./catalog.component";
import {CarDetailsComponent} from "./car-details/car-details.component";

const routes: Routes = [
  {path: '', component: CatalogComponent},
  {path: ':id', component: CarDetailsComponent}
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