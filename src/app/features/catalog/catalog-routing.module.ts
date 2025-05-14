import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  { path: '', title: 'Catalog', component: CatalogComponent },
  {
    path: ':id',
    title: 'product',
    loadChildren: () =>
      import('../product/product.module').then(
        (m) => m.ProductModule
      ),
    data: { breadcrumb: { label: 'Машина' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
