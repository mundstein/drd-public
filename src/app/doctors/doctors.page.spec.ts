import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'

import { DoctorsPage } from './doctors.page'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'

describe('DoctorsPage', () => {
  let component: DoctorsPage
  let fixture: ComponentFixture<DoctorsPage>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        FormsModule
      ],
      providers: [ InAppBrowser]
    }).compileComponents()

    fixture = TestBed.createComponent(DoctorsPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
});
