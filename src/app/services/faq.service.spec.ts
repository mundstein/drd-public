import { TestBed } from '@angular/core/testing';

import { FaqService } from './faq.service';

describe('FaqService', () => {
  let service: FaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have four categories', () => {
    expect(service.faqs().length).toBe(4)
  })

  it('should have 12 items in the health category', () => {
    const health = service.faqs()[0]
    expect(health.category).toBe('category.health')
    expect(health.faqs.length).toBe(12)
  })
});
