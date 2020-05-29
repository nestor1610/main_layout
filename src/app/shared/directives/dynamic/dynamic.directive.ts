import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[charge-dynamic]'
})
export class DynamicDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
