import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import { AddcarformComponent } from './addcarform/addcarform.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)},
  {path: 'addcar', component: AddcarformComponent},
  {path: '**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
