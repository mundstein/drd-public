import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsPage } from './doctors.page';

import { DoctorsPageRoutingModule } from './doctors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from '../settings/settings.component';
import { FaqComponent } from '../settings/faq/faq.component';
import { FaqCardComponent } from '../settings/faq-card/faq-card.component';
import { PrivacyComponent } from '../settings/privacy/privacy.component';


@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    CommonModule,
    FormsModule,
    DoctorsPageRoutingModule
  ],
  declarations: [
    DoctorsPage, 
    SettingsComponent, 
    FaqComponent,
    FaqCardComponent,
    PrivacyComponent
  ]
})
export class DoctorsPageModule {}
