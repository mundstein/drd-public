import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckupPageRoutingModule } from './checkup-routing.module';

import { CheckupPage } from './checkup.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatusDotComponent } from './status-dot/status-dot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckupPageRoutingModule,
    SharedModule,
  ],
  declarations: [CheckupPage, StatusDotComponent]
})
export class CheckupPageModule {}
