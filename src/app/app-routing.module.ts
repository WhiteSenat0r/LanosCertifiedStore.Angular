import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './core/ui/not-found/not-found.component';
import { AuthCallbackComponent } from './core/auth/component/auth-callback.component';

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
  {
    path: 'profile',
    title: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
    data: { breadcrumb: { label: 'Профіль' } },
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
