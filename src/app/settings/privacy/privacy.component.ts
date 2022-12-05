import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationFileService } from 'src/app/services/translation-file.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit, OnDestroy {

  constructor(private translationFileService: TranslationFileService,) { }

  ngOnInit() {
    this.translationFileService.addTranslationsFromDirectory('privacy')
  }
  
  ngOnDestroy() {
    this.translationFileService.switchToBaseTranslations()
  }

}
