import { TestBed, inject } from '@angular/core/testing';

import { BranchsService } from './branchs.service';

describe('BranchsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchsService]
    });
  });

  it('should be created', inject([BranchsService], (service: BranchsService) => {
    expect(service).toBeTruthy();
  }));
});
