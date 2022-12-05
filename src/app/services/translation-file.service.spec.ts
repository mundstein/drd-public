import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationFileService } from './translation-file.service';

describe('TranslationFileService', () => {
  let service: TranslationFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [TranslationFileService]
    });
    service = TestBed.inject(TranslationFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
