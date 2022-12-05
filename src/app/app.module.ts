import { NgModule, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { IonicStorageModule } from '@ionic/storage-angular'
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'
import { MESSAGE_FORMAT_CONFIG, TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'

import { registerLocaleData } from '@angular/common'
import localeAt from '@angular/common/locales/de-AT'

registerLocaleData(localeAt);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'de',
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MESSAGE_FORMAT_CONFIG, useValue: { locales: ['en', 'de']}},
    { provide: LOCALE_ID, useValue: 'de-AT' },
    InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
