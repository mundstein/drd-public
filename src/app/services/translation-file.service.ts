import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TranslationFileService {

  baseUrl = 'assets/i18n'
  locales = ['en', 'de']

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  private loadTranslations(locale: string, url: string) {
    return this.http.get(`${url}/${locale}.json`)
      .subscribe(data => {
        this.translate.setTranslation(locale, data)
      })
  }

  addTranslationsFromDirectory(directory: string) {
    this.locales.forEach(
      locale => this.addToBaseTranslations(directory, locale)
    )
  }

  switchToBaseTranslations() {
    this.locales.forEach(
      locale => this.loadTranslations(locale, this.baseUrl)
    )
  }

  private addToBaseTranslations(directory: string, locale: string) {
    const standard = this.http.get(`${this.baseUrl}/${locale}.json`)
    const additional = this.http.get(`${this.baseUrl}/${directory}/${locale}.json`)
    forkJoin([standard, additional]).pipe(
      map((result) => 
        result.reduce((obj, item) => Object.assign(obj, item))
      )
    )
    .subscribe(translationData => {
      this.translate.setTranslation(locale, translationData)
    })
  }
}
