import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '@capacitor/device'

@Component({
  selector: 'app-tab3',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage implements OnInit {
  showDrdInfo = false
  isAndroid = false
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    Device.getInfo().then( info => 
      this.isAndroid = info.platform == 'android'
    )

  }
  
  ionViewWillEnter() {
    if (this.route.snapshot.params['drd']) {
     this.showDrdInfo = true
    }
  }

  didDismissDrdInfo() {
    this.showDrdInfo = false
  }
}
