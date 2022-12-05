import { FaqItem } from 'src/app/types/faq-item';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationFileService } from 'src/app/services/translation-file.service';

import { FaqCardComponent } from './faq-card.component';

describe('FaqCardComponent', () => {
  let component: FaqCardComponent;
  let fixture: ComponentFixture<FaqCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCardComponent ],
      imports: [
        IonicModule.forRoot(), 
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      providers: [TranslationFileService]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqCardComponent);
    component = fixture.componentInstance;
    component.item = {title: "test", text: "test"} as FaqItem
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
