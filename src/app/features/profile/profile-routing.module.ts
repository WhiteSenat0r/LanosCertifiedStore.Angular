import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    title: 'Профіль користувача',
    component: ProfileComponent,
    data: { breadcrumb: { label: 'Профіль' } },
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import('../../features/add-product/add-product.module').then(
        (m) => m.AddProductModule
      ),
    data: { breadcrumb: { label: 'Створення оголошення' } },
  },
  {
    path: ':id',
    title: 'Редагування оголошення',
    loadChildren: () =>
      import('../edit-product/edit-product.module').then((m) => m.EditProductModule),
    data: { breadcrumb: { label: 'Редагування оголошення' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
