import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepagebannerComponent } from './components/homepagebanner/homepagebanner.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

const routes: Routes = [
  {
    path: '',
    component : HomepagebannerComponent,
    title: 'Home'
  },
  /* {
    path: 'search',
    component : SearchbarComponent,
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
