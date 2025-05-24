import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './core/ui/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    data: { breadcrumb: { label: 'Колеско', info: 'home_xng' } },
  },
  {
    path: 'catalog',
    title: 'catalog',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then((m) => m.CatalogModule),
    data: { breadcrumb: { label: 'Каталог' } },
  },
  { path: '**', component: NotFoundComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
