import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { AdminsearchbarComponent } from "./adminsearchbar/adminsearchbar.component";
import { BrandtabletabsComponent } from "./brandtabletabs/brandtabletabs.component";
import { ColortabletabsComponent } from "./colortabletabs/colortabletabs.component";
import { ModeltabletabsComponent } from "./modeltabletabs/modeltabletabs.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TabletabsComponent } from "./tabletabs/tabletabs.component";

import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        DashboardComponent,
        AdminsearchbarComponent,
        BrandtabletabsComponent,
        ColortabletabsComponent,
        ModeltabletabsComponent,
        SidebarComponent,
        TabletabsComponent,
    ],
    imports: [
        FormsModule,
        DashboardRoutingModule,
        SharedModule,
        CommonModule,
    ]
})
export class DashboardModule { }