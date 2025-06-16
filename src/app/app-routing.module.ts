import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './core/ui/not-found/not-found.component';
import { AuthCallbackComponent } from './core/auth/component/auth-callback.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    title: 'Kolesko - Маркетплейс вживаних автомобілів',
    component: HomeComponent,
    data: { breadcrumb: { label: 'Колеско', info: 'home_xng' } },
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then((m) => m.CatalogModule),
    data: { breadcrumb: { label: 'Каталог' } },
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
    //GUARD FOR UNAUTHORIZED USER
    canActivate: [AuthGuard],
    data: { breadcrumb: { label: 'Профіль' } },
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    title: 'Попадалово',
    component: NotFoundComponent,
    data: { breadcrumb: { label: 'Попадалово' } },
  },
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
