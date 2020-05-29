import { TestBed, inject } from '@angular/core/testing';

import { RolsService } from './rols.service';

describe('RolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolsService]
    });
  });

  it('should be created', inject([RolsService], (service: RolsService) => {
    expect(service).toBeTruthy();
  }));
});
