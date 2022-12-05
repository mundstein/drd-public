import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToHome() {
    return browser.get('/tabs/info', 10000);
  }

  getPageTitle() {
    return element(by.css("ion-title")).getText()
  }
}
