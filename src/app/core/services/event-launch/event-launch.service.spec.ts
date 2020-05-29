import { TestBed, inject } from '@angular/core/testing';

import { EventLaunchService } from './event-launch.service';

describe('EventLaunchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventLaunchService]
    });
  });

  it('should be created', inject([EventLaunchService], (service: EventLaunchService) => {
    expect(service).toBeTruthy();
  }));
});
