import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-dot',
  templateUrl: './status-dot.component.html',
  styleUrls: ['./status-dot.component.scss'],
})
export class StatusDotComponent implements OnInit {

  @Input() status = 'notAnswered'
  @Input() showTitle = false

  constructor() { }

  ngOnInit() {}

  get class(): string {
    switch (this.status) {
      case 'notAnswered': return "dot"
      case 'yes': return "dot yes"
      case 'no': return "dot no"
      case 'dontKnow': return "dot dontKnow"
      default: return "dot"
    }
  }
  
  get title(): string {
    if (!this.status) {
      return 'Checkup.answer.notAnswered'
    }
    if (['notAnswered', 'yes', 'no', 'dontKnow'].includes(this.status)) {
      return 'Checkup.answer.' +  this.status
    }
    else {
      return this.status
    }
  }

}
