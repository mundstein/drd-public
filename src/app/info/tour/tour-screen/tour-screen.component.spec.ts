import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InfoTourStepData } from 'src/app/types/info-tour-step-data.interface';
import { SwiperModule } from 'swiper/angular';

import { TourScreenComponent } from './tour-screen.component';

describe('TourScreenComponent', () => {
  let component: TourScreenComponent;
  let fixture: ComponentFixture<TourScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TourScreenComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        SwiperModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TourScreenComponent);
    component = fixture.componentInstance;
    component.slide = {} as InfoTourStepData
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
