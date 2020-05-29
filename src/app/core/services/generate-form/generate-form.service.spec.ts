import { TestBed, inject } from '@angular/core/testing';

import { GenerateFormService } from './generate-form.service';

describe('GenerateFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateFormService]
    });
  });

  it('should be created', inject([GenerateFormService], (service: GenerateFormService) => {
    expect(service).toBeTruthy();
  }));
});
