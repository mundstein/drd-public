import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-capsule',
  templateUrl: './capsule.component.html',
  styleUrls: ['./capsule.component.scss'],
})
export class CapsuleComponent implements OnInit {

  @Input() text = ''
  @Input() bgColor = 'darkgray'
  @Input() textColor = 'white'
  constructor() { }
  ngOnInit() {}

}
