import { TestBed, inject } from '@angular/core/testing';

import { TableListSettingsService } from './table-list-settings.service';

describe('TableListSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableListSettingsService]
    });
  });

  it('should be created', inject([TableListSettingsService], (service: TableListSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
