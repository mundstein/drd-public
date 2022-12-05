import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  @Input() exportEnabled = false
  @Input() loading = 0
  @Input() isAndroid = false
  @Output() dismiss = new EventEmitter()
  @Output() launchUrl = new EventEmitter()
  @Output() export = new EventEmitter()
  @Output() showComponent = new EventEmitter()

  get loading_() { return this.loading }
  set loading_(newValue) { this.loading = newValue }

  constructor(
    private router: Router
  ) { }

  goToInfo() {
    this.dismiss.emit()
    setTimeout(() => {
      this.router.navigate(['/tabs', 'info', {drd: true}])
      
    }, 200)
  }

  async goTo(url: string, id: number) {
    this.launchUrl.emit(url)
    this.loading = id
  }
}