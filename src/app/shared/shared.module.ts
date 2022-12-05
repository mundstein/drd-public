import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CapsuleComponent } from './capsule/capsule.component';


@NgModule({
  declarations: [CapsuleComponent],
  imports: [
    CommonModule, TranslateModule
  ],
  exports: [
    TranslateModule, ReactiveFormsModule, MatIconModule, CapsuleComponent
  ]
})
export class SharedModule { }
