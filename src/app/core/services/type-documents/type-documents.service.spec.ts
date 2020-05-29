import { TestBed, inject } from '@angular/core/testing';

import { TypeDocumentsService } from './type-documents.service';

describe('TypeDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeDocumentsService]
    });
  });

  it('should be created', inject([TypeDocumentsService], (service: TypeDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
