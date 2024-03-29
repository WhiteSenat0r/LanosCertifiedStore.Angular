import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { AdminsearchbarComponent } from "./adminsearchbar/adminsearchbar.component";
import { BrandtabletabsComponent } from "./brandtabletabs/brandtabletabs.component";
import { ColortabletabsComponent } from "./colortabletabs/colortabletabs.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TabletabsComponent } from "./tabletabs/tabletabs.component";
import { ModeltabletabsComponent } from "./modeltabletabs/modeltabletabs.component";

@NgModule({
  declarations: [
    DashboardComponent,
    AdminsearchbarComponent,
    BrandtabletabsComponent,
    ColortabletabsComponent,
    SidebarComponent,
    TabletabsComponent,
    ModeltabletabsComponent,
  ],
  imports: [
    FormsModule,
    DashboardRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }

