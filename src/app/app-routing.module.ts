import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepagebannerComponent } from './components/homepagebanner/homepagebanner.component';

const routes: Routes = [
  {
    path: '',
    component : HomepagebannerComponent,
    title: 'Home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
