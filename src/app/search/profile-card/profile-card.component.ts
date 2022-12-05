import { Component, OnInit, Input } from '@angular/core'
import { Profile } from 'src/app/types/profile'

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() profile: Profile
  status: string
  constructor() { }
  ngOnInit() { 
    this.status = Profile.openingHoursStatus(this.profile)
  }

  formattedSpecialty(): string {
    return Profile.formattedSpecialty(this.profile)
  }
}
