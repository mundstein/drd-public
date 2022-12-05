import { Component, OnInit } from '@angular/core'
import { DataService } from '../services/data.service'
import { Anamnesis } from '../types/anamnesis'

@Component({
  selector: 'app-anamnesis',
  templateUrl: 'anamnesis.page.html',
  styleUrls: ['anamnesis.page.scss']
})
export class AnamnesisPage implements OnInit {

  anamnesis: Anamnesis 
  checkupEnabled = true

  topics = [
   { name: 'bodyData', icon: 'accessibility_new', url: 'body'},
   { name: 'allergies',  icon: 'filter_vintage', url: 'allergies'},
   { name: 'illnesses',  icon: 'bed', url: 'illnesses' },
   { name: 'surgeries',  icon: 'medical_services', url: 'surgeries'},
   { name: 'medications', icon: 'medication_liquid', url: 'medications' }
  ]
  .map( topic => {
    return { 
      icon: topic.icon,
      title: `Anamnesis.titles.${topic.name}`,
      subtitle: `Anamnesis.subtitles.${topic.name}`,
      url: topic.url
    }
  })

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.anamnesis = this.dataService.anamnesis
  }

  ionViewWillEnter() {
    this.checkupEnabled = true
  }

  tappedCheckup() {
    this.checkupEnabled = false
  }
}
