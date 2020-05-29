import { TestBed, inject } from '@angular/core/testing';

import { DynamicInputService } from './dynamic-input.service';

describe('DynamicInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicInputService]
    });
  });

  it('should be created', inject([DynamicInputService], (service: DynamicInputService) => {
    expect(service).toBeTruthy();
  }));
});
