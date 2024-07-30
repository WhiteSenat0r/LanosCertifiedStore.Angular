import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './core/ui/not-found/not-found.component';
import { MaincharacteristicsComponent } from './filters/maincharacteristics/maincharacteristics.component';
import { TechnicalparametersComponent } from './filters/technicalparameters/technicalparameters.component';

const routes: Routes = [
  {
    path: '',
    title: 'home',
    component: HomeComponent,
  },
  {
    path: 'main',
    title: 'main',
    component: MaincharacteristicsComponent,
  },
  {
    path: 'type',
    title: 'type',
    component: TechnicalparametersComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
