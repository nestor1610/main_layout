import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DynamicInputService {

  constructor() { }

  dynamicInputEvent = new EventEmitter();

}
