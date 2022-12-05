import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MeasurementsPage } from './measurements.page';

describe('MeasurementsPage', () => {
  let component: MeasurementsPage;
  let fixture: ComponentFixture<MeasurementsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementsPage ],
      imports: [
        IonicModule.forRoot(), 
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeasurementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate correct BMI', () => {
    component.anamnesis.height = 200
    component.anamnesis.weight = 100
    expect(component.bmi).toEqual(25)
  });

  it('should return zero BMI when height is zero', () => {
    component.anamnesis.height = 0
    component.anamnesis.weight = 100
    expect(component.bmi).toEqual(0)
  });
});
