import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'
import { Device } from '@capacitor/device'
import { TranslateService } from '@ngx-translate/core'
import { from } from 'rxjs'
import { DataService } from '../services/data.service'
import { UploadService } from '../services/upload.service'



@Component({
  selector: 'app-tab1',
  templateUrl: 'doctors.page.html',
  styleUrls: ['doctors.page.scss']
})
export class DoctorsPage implements OnInit {

  showModal = false
  showSettings = false
  showUpload = false
  anamnesisComplete = true
  settingsLoading = 0
  apiLoading = false
  hasProfile = false

  // Anamesis upload
  form: FormGroup
  currentError = ''
  success = false
  isAndroid = false

  constructor(
    private iab: InAppBrowser,
    private translate: TranslateService, 
    private dataService: DataService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl(null)
    })
    from(Device.getInfo()).subscribe({
      next: info => this.isAndroid = info.platform == 'android'
    })
  }

  get content() {
    return document.querySelector('ion-content')
  }

  scrollToBottom() {
    if (!this.anamnesisComplete) { 
      return 
    }
    setTimeout(() => this.content.scrollToBottom(500), 200)
  }

  goTo(url: any) {
    this.showSettings = false
    const lang = this.translate.currentLang
    if (lang != "de") {
      let base = new URL(url)
      base.pathname = "en" + base.pathname
      url = base.href
    }
    const options = 'location=yes,footer=yes'
    this.iab.create(url, '_blank', options)
  }

  showFAQ = false
  showPrivacy = false 

  showComponent(name: string) {
    this.showSettings = false
    if (name == 'faq') {
      this.showFAQ = true
    }
    if (name == 'privacy') {
      this.showPrivacy = true
    }
  } 

  send() {
    this.currentError = ''
    this.success = false
    const code = this.form.get('code').value
    const anamnesis = this.dataService.anamnesis
    this.apiLoading = true
    this.uploadService.upload(anamnesis, code)
    .subscribe({
      next: () => {
        this.apiLoading = false
        this.success = true
      },
      error: (error) => {
        this.apiLoading = false
        console.log(error)
        this.currentError = error.error.errorCode
          ? error.error.errorCode : error
        this.scrollToBottom()
      }
    })
  }  
}
