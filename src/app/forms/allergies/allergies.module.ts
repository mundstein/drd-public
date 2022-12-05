import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AllergiesPageRoutingModule } from './allergies-routing.module';
import { AllergiesPage } from './allergies.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllergiesPageRoutingModule
  ],
  declarations: [AllergiesPage]
})
export class AllergiesPageModule {}
