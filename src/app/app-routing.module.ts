import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepagebannerComponent } from './components/homepagebanner/homepagebanner.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CatalogpageComponent} from "./components/catalogpage/catalogpage.component";
import { TilehomepageComponent } from './components/tilehomepage/tilehomepage.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarinfopageComponent } from './components/carinfopage/carinfopage.component';
import { AddcarformComponent } from './components/addcarform/addcarform.component';

const routes: Routes = [
  {
    path: '',
    component : HomepagebannerComponent,
    title: 'Home'
  },
  {
    path: 'search',
    component : SearchbarComponent,
  }, 
  {
    path: 'catalog',
    component : CatalogpageComponent,
  },
  {
    path: 'tile',
    component : TilehomepageComponent,
  },
  {
    path: 'cards',
    component : CardsComponent,
  },
  {
    path: 'addcar',
    component : AddcarformComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
