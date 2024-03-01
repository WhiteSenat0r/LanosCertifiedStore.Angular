import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from './dashboard.component';
import { BrandtabletabsComponent } from "./brandtabletabs/brandtabletabs.component";
import { ColortabletabsComponent } from "./colortabletabs/colortabletabs.component";
import { ModeltabletabsComponent } from "./modeltabletabs/modeltabletabs.component";
import { TabletabsComponent } from "./tabletabs/tabletabs.component";
import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'brands', component: BrandtabletabsComponent },
  { path: 'models', component: ModeltabletabsComponent },
  { path: 'types', component: TabletabsComponent },
  { path: 'colors', component: ColortabletabsComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutingModule { }