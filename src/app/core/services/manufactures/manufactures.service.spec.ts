import { TestBed, inject } from '@angular/core/testing';

import { ManufacturesService } from './manufactures.service';

describe('ManufacturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufacturesService]
    });
  });

  it('should be created', inject([ManufacturesService], (service: ManufacturesService) => {
    expect(service).toBeTruthy();
  }));
});
