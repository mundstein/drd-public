import { Component, Input, OnInit } from '@angular/core';
import { FaqItem } from 'src/app/types/faq-item';

@Component({
  selector: 'app-faq-card',
  templateUrl: './faq-card.component.html',
  styleUrls: ['./faq-card.component.scss'],
})
export class FaqCardComponent implements OnInit {

  @Input() item: FaqItem
  expanded = false

  constructor() { }

  ngOnInit() {}

  toggle() {
    this.expanded = !this.expanded
  }

}
