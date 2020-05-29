import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventLaunchService {
  dinamicEvent = new EventEmitter();
  loginEvent = new EventEmitter();
  navElementEvent = new EventEmitter();
  changeOrganizationEvent = new EventEmitter();

  constructor() { }

}
