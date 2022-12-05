import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AllergiesPage } from './allergies.page';

describe('AllergiesPage', () => {
  let component: AllergiesPage;
  let fixture: ComponentFixture<AllergiesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergiesPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        MatIconModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllergiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
