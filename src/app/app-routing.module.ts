import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '/catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)},
  {path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
