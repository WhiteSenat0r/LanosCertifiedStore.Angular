import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  { path: '', title: 'Catalog', component: CatalogComponent },
  {
    path: ':id',
    title: 'Vehicle Details',
    loadChildren: () => import("../../vehicle-details/vehicle-details.module").then((m) => m.VehicleDetailsModule),
    data: { breadcrumb: { label: 'Машина' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
