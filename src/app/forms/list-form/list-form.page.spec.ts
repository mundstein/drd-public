import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ListFormPage } from './list-form.page';

describe('ListFormPage', () => {
  let component: ListFormPage;
  let fixture: ComponentFixture<ListFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one card for each item', () => {
    component.items = ["first", "second", "third", "fourth"]
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('ion-card')).length)
      .toEqual(component.items.length)
  })

  it('should show placeholder if there are no items', () => {
    const element = fixture.debugElement.queryAll(By.css('.no-items'))[0]
    expect(element).toBeTruthy();
  })
});
