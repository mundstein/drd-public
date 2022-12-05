import { Component, Input, OnInit } from '@angular/core';
import { InfoTourStepData } from 'src/app/types/info-tour-step-data.interface';

@Component({
  selector: 'app-tour-screen',
  templateUrl: './tour-screen.component.html',
  styleUrls: ['./tour-screen.component.scss'],
})
export class TourScreenComponent implements OnInit {

  @Input() slide: InfoTourStepData
  constructor() { }

  ngOnInit() {}

}
