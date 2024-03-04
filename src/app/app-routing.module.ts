import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { HomeComponent} from "./features/home/home.component";
import { TestErrorsComponent } from './core/test-errors/test-errors.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: { breadcrumb: { label: 'Головна сторінка', info: 'home'} }},
  {path: 'catalog', loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule), data: { breadcrumb: 'Каталог' } },
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'vehicleoperate', loadChildren: () => import('./features/vehicleoperate/vehicleoperate.module').then(m => m.VehicleoperateModule)},
  {path: 'dashboard', loadChildren: () =>import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'test-errors', component: TestErrorsComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
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
