import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/feature/home.component';
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
      import('./features/catalog/feature/catalog.module').then((m) => m.CatalogModule),
    data: { breadcrumb: { label: 'Каталог' } },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
