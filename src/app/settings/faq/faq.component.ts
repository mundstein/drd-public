import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaqService } from 'src/app/services/faq.service';
import { TranslationFileService } from 'src/app/services/translation-file.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {

  translationUrl = 'assets/i18n'
  locale = 'en'

  faqs = []
  constructor(
    private faqService: FaqService,
    private translationFileService: TranslationFileService,
  ) {}
  
  ngOnInit() {
    this.faqs = this.faqService.faqs()
    this.translationFileService.addTranslationsFromDirectory("faq")
  }

  ngOnDestroy(): void {
    this.translationFileService.switchToBaseTranslations()
  }
}
