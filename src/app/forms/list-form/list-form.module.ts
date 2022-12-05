import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListFormPageRoutingModule } from './list-form-routing.module';

import { ListFormPage } from './list-form.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicineFormComponent } from '../medicine-form/medicine-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListFormPageRoutingModule,
    SharedModule
  ],
  declarations: [ListFormPage, MedicineFormComponent]
})
export class ListFormPageModule {}
