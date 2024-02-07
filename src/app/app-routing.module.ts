import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepagebannerComponent } from './components/homepagebanner/homepagebanner.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CatalogpageComponent} from "./components/catalogpage/catalogpage.component";

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
  {
    path: 'catalog',
    component : CatalogpageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
