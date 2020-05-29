import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appContenScroll]'
})
export class ContentScrollDirective {

  constructor(el: ElementRef) {

    el.nativeElement.setAttribute("style","height:"+ ( screen.height-200 )+"px");

   }

}
