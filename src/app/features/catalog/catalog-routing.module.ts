import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  { path: '', title: 'Каталог', component: CatalogComponent },
  {
    path: ':id',
    title: 'Купити машинку',
    loadChildren: () =>
      import('../product/product.module').then(
        (m) => m.ProductModule
      ),
    data: { breadcrumb: { label: 'Машинка' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
