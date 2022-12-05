import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false)
    browser.wait(element(by.css("ion-title")).isDisplayed)
  });
  
  it('should display correct title', () => {
    page.navigateToHome();
    expect(element.all(by.css("ion-title"))
      .get(1)
      .getText()
    ).toEqual("THIS SHOULD FAIL")
  });

  it('should show 5 anamnesis topics', () => {
    browser.get('/tabs/anamnesis').then(() => {
      element.all(by.css("ion-item")).count().then( c => {
        expect(c).toBe(50) // should fail
      })
    })
  })
});
