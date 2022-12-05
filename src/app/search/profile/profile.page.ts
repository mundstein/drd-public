import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/types/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile$: Observable<Profile>
  
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.profile$ = this.profileService.profile(id)
    //.pipe(tap(console.log))
  }

  fullName(profile) {
    return Profile.fullName(profile)
  }

  prefix(profile) {
    if (!profile) { return "Dr. " }
    const grade = profile.grade
    return (!!grade && grade != "") ? grade : "Dr. "
  }

  suffix(profile) {
    if (!profile) { return "" }
    const grade = profile.gradeI
    return (!!grade && grade != "") ? grade : ""
  }

  title(profile) {
    if (!profile) { return ""}
    const title = profile.title
    return (!!title && title != "") ? title : ""
  }

  isOpen(profile) {
    if (!profile) { return false }
    return Profile.isOpen(profile)
  }

  openStatus(profile) {
    if (!profile) { return "none" }
    return Profile.openingHoursStatus(profile)
  }

  sanitizeImageUrl(url: string): string {
    if (url.includes('localhost')) {
      url = 'https://' + url.substring(42)
    }
    return url
  }

  cleanStreetAddress(address: string): string {
    if (!address.includes('.')) {
      return address;
    } else {
      return address.replace(/\./, '. ');
    }
  }

  formattedAddress(profile: Profile): string {
    const a = profile.employer.address;
    const street = this.cleanStreetAddress(a.street);
    return `${a.zipCode} ${a.city}, ${street} ${a.streetNumber}`;
  }

  onCall(profile: Profile) {
    const phone = profile.doctor.phoneNumber?.replace(/\D/g, '');
    if (!!phone && phone.length > 0) {
      window.location.href = `tel:${phone}`;
    }
  }

  onEmail(profile: Profile) {
    window.location.href = this.emailLink(profile);
  }

  onMap(profile: Profile) {
    window.open(this.mapLink(profile), '_blank');
  }

  formattedSpecialty(profile: Profile): string {
    return Profile.formattedSpecialty(profile)
  }

  phoneLink(phone: string): string {
    const number = phone.replace(/\D/g, '');
    return `tel:${number}`;
  }

  formattedPhone(phone: string): string {
    return phone.replace(/^0/, '+43-').replace('/', '-');
  }

  formattedInsurers(insurers: string[] | null): string | null {
    if (
      !insurers ||
      insurers.length == 0 ||
      (insurers.length == 1 && insurers[0] == '')
    ) {
      return null
    }
    return insurers.join(', ')
  }

  mapLink(profile: Profile): string {
    const address = encodeURIComponent(this.formattedAddress(profile));
    return 'https://map.google.com/?q=' + address;
  }

  openingHourData(profile: Profile): any[] | null {
    let result = [];
    let currentDay = 0;
    for (let schedule of profile.employer.openingHours) {
      let line: any = {};
      if (schedule.weekday == currentDay) {
        line = result.pop();
        line.time += ' & ';
        line.time += schedule.text.substring(3);
      } else {
        line.day = schedule.text.substring(0, 3);
        line.time = schedule.text.substring(3);
      }
      currentDay = schedule.weekday;
      result.push(line);
    }
    return result.length > 0 ? result : null
  }

  formattedSpecialties(profile: Profile): string | null {
    if (!profile.otherSubjects) {
      return !!profile.qualification ? profile.qualification : null;
    } else {
      return !!profile.qualification
        ? profile.otherSubjects + ' ' + profile.qualification
        : profile.otherSubjects;
    }
  }

  emailLink(profile: Profile): string {
    if (!profile.employer.email) {
      return '';
    }
    const subject = 'Terminanfrage';
    let bodyText = 'Ich bitte um Kontaktaufnahme.';
    return `mailto:${profile.employer.email
      }?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  }

  institutionPosition(profile: Profile) {
    if (!!profile.institutionRole) {
      return profile.institutionRole + ", " +
        (profile.institutionDepartment ? profile.institutionDepartment + ", " : "") +
        profile.institution.name
    }
    return null
  }
}
