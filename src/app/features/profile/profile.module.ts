import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { BannerComponent } from './banner/banner.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { CarcardComponent } from './carcard/carcard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BannerComponent,
    TabsComponent,
    ProfileComponent,
    CarcardComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule, 
    RouterModule,
  ]
})
export class ProfileModule { }
