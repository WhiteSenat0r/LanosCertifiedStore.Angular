import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PofileComponent } from './pofile.component';
import { BannerComponent } from './banner/banner.component';
import { TabsComponent } from './tabs/tabs.component';


@NgModule({
  declarations: [
    PofileComponent,
    BannerComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
