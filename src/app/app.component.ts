import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Device } from '@capacitor/device'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.setLanguage()
  }

  setLanguage() {
    from(Device.getLanguageCode()).subscribe(result => {
      const code = result.value.substring(0, 2) == 'de' ? 'de' : 'en'
      this.translate.use(code)
    })
  }
}
