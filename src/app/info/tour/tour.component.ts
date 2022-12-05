import { Component, EventEmitter, Output } from '@angular/core';
import { InfoTourService } from 'src/app/services/info-tour.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
})
export class TourComponent {

  @Output() dismiss = new EventEmitter()
  slides = this.tour.data
  private swiper: any
  showNext = true

  constructor(private tour: InfoTourService) { }

  setSwiperInstance(swiper: any) {
    this.swiper = swiper
    this.swiper.on('slideChange', (swiper: Swiper) => {
      this.showNext = swiper.activeIndex < this.slides.length - 1
    })
  }

  forward() {
    this.swiper.slideNext()
  }

  sendDismiss() {
    this.dismiss.emit()
  }
}
