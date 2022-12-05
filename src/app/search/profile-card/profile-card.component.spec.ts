import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Profile } from 'src/app/types/profile';

import { ProfileCardComponent } from './profile-card.component';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCardComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;
    component.profile = { 
      id: 1, 
      doctor: { firstName: "John", lastName: "Doe"},
      specialty: { group: "Facharzt", mainSubject: "Chirurgie" },
      employer: { address: { zipCode: "1190", city: "Wien"}}
    } as Profile
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
