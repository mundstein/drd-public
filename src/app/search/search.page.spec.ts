import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

import { SearchPage } from './search.page';
import { Profile } from '../types/profile';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPage ],
      imports: [
        IonicModule.forRoot(), 
        SharedModule, 
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly evaluate opening hours', () => {
    const goodTime = new Date(2022, 7, 24, 12, 45, 0)
    const badTime = new Date(2022, 7, 24, 0, 22, 0)
    expect(Profile.isOpenWithTime(PROFILE, goodTime)).toBeTrue()
    expect(Profile.isOpenWithTime(PROFILE, badTime)).toBeFalse()
    const result = Profile.isOpen(PROFILE) ? "open" : "closed"
    expect(Profile.openingHoursStatus(PROFILE)).toEqual(result)
    let profile = PROFILE
    profile.employer.openingHours = []
    expect(Profile.openingHoursStatus(profile)).toBe("none")
    profile.employer = null
    expect(Profile.openingHoursStatus(profile)).toBe("none")
  })
});



const PROFILE = {
  "id": 23823,
  "doctor": {
    "id": 23829,
    "firstName": "Karin",
    "lastName": "Bakowsky-Schaidreiter",
    "profileImage": null,
    "gender": "female",
    "userAccount": null,
    "address": null,
    "birthday": null,
    "ssn": null,
    "insurer": null,
    "online": false,
    "speciality": null,
    "phoneNumber": null
  },
  "specialty": {
    "id": 34,
    "group": "Facharzt",
    "mainSubject": "Psychiatrie und psychotherapeutische Medizin"
  },
  "employer": {
    "practiceNumber": "368871",
    "name": "Karin Bakowsky-Schaidreiter",
    "address": {
      "id": 26536,
      "street": "Bahnstr.36",
      "streetNumber": "",
      "zipCode": "3550",
      "city": "Langenlois",
      "county": "Niederösterreich",
      "country": ""
    },
    "email": "kontakt@psy-arztpraxis.at",
    "phone": "0677/63600194",
    "fax": "",
    "insurers": null,
    "url": "https://www.psy-arztpraxis.at",
    "openingHours": [
      {
        "weekday": 3,
        "startTime": "0900",
        "endTime": "1700",
        "text": "MI: 09:00-17:00"
      }
    ]
  },
  "institution": {
    "id": 26522,
    "practiceNumber": null,
    "name": "Privatklinik Hollenburg Sonderkrankenanstalt für psychiatrische Rehabilitation",
    "email": "office.hollenburg@sanlas.at",
    "phone": "02739/77110",
    "fax": "02739/77110-8000",
    "insurers": null,
    "url": "http://www.sanlas.at",
    "institutionNumber": "4008100",
    "type": "Krankenanstalten",
    "subject": "",
    "address": {
      "city": "Hollenburg",
      "zipCode": "7320", 
      "street":"Hollabrunner Straße 44", 
      "streetNumber" : ""
    }
  },
  "institutionRole": "-",
  "institutionDepartment": "",
  "title": "",
  "grade": "Mag. Dr. ",
  "gradeI": "",
  "otherSubjects": "",
  "qualification": "Dipl. Forensisch-psychiatrische Gutachten Dipl. Substitutionsbehandlung ",
  "doctorNumber": "54503-61",
  "personId": null
} as Profile