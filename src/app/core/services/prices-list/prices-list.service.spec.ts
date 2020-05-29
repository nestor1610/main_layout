import { TestBed, inject } from '@angular/core/testing';

import { PricesListService } from './prices-list.service';

describe('PricesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricesListService]
    });
  });

  it('should be created', inject([PricesListService], (service: PricesListService) => {
    expect(service).toBeTruthy();
  }));
});
