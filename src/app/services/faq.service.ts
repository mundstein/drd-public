import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor() { }

  faqs() {
    return [
      {
        category: 'category.health',
        faqs: [
          { title: 'faq.1.title', text: 'faq.1.text' },
          { title: 'faq.2.title', text: 'faq.2.text' },
          { title: 'faq.3.title', text: 'faq.3.text' },
          { title: 'faq.4.title', text: 'faq.4text' },
          { title: 'faq.5.title', text: 'faq.5.text' },
          { title: 'faq.6.title', text: 'faq.6.text' },
          { title: 'faq.7.title', text: 'faq.7.text' },
          { title: 'faq.8.title', text: 'faq.8.text' },
          { title: 'faq.9.title', text: 'faq.9.text' },
          { title: 'faq.10.title', text: 'faq.10.text' },
          { title: 'faq.11.title', text: 'faq.11.text' },
          { title: 'faq.12.title', text: 'faq.12.text' },
        ]
      },
      {
        category: 'category.costs',
        faqs: [
          { title: 'faq.13.title', text: 'faq.13.text' },
          { title: 'faq.14.title', text: 'faq.14.text' }
        ]
      },
      {
        category: 'category.privacy',
        faqs: [
          { title: 'faq.15.title', text: 'faq.15.text' },
          { title: 'faq.16.title', text: 'faq.16.text' },
          { title: 'faq.17.title', text: 'faq.17.text' },
          { title: 'faq.18.title', text: 'faq.18.text' }
        ]
      },
      {
        category: 'category.usage',
        faqs: [
          { title: 'faq.19.title', text: 'faq.19.text' },
          { title: 'faq.20.title', text: 'faq.20.text' },
          { title: 'faq.21.title', text: 'faq.21.text' },
        ]
      },
    ]
  }
}
