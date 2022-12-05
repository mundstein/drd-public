import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MedicineFormComponent } from './medicine-form.component';

describe('MedicineFormComponent', () => {
  let component: MedicineFormComponent;
  let fixture: ComponentFixture<MedicineFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineFormComponent ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicineFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl(null), 
      dosis: new FormControl(null), 
      date: new FormControl(null)
    })
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
