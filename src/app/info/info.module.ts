import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info.page';

import { InfoPageRoutingModule } from './info-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TourComponent } from './tour/tour.component';
import { SwiperModule } from 'swiper/angular'
import { TourScreenComponent } from './tour/tour-screen/tour-screen.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InfoPage }]),
    InfoPageRoutingModule,
    SharedModule,
    SwiperModule
  ],
  declarations: [InfoPage, TourComponent, TourScreenComponent]
})
export class InfoPageModule {}
