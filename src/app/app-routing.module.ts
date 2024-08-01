import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './core/ui/not-found/not-found.component';
import { CatalogComponent } from './catalogpage/catalog/catalog.component';


const routes: Routes = [
  {
    path: '',
    title: 'home',
    component: HomeComponent,
  },
  {

    path: 'catalog',
    title: 'catalog',
    component: CatalogComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
