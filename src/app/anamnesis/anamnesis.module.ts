import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AnamnesisPage } from './anamnesis.page';

import { AnamnesisPageRoutingModule } from './anamnesis-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    AnamnesisPageRoutingModule,
    SharedModule
  ],
  declarations: [AnamnesisPage]
})
export class AnamnesisPageModule {}
