import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import { AddcarformComponent } from './addcarform/addcarform.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: { breadcrumb: { label: 'Головна сторінка', info: 'home'} }},
  {path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule), data: { breadcrumb: 'Каталог' } },
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'addcar', component: AddcarformComponent},
  {path: 'dashboard', loadChildren: () =>import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
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
