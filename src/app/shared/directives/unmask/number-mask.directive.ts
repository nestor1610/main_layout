import { Directive, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { unMaskNumberFormat } from '../../utils/stringUtils';

@Directive({
  selector: '[unNumberMask]'
})
export class UnNumberMaskDirective implements OnInit, OnDestroy {

  @Input() unNumberMask: any;
  private subscriber;
  constructor(
    private elementRef: ElementRef,
    private model: NgControl
  ) { }

  ngOnInit(): void {
    this.subscriber = this.model.control.valueChanges.subscribe(() => {
      console.log('valor nativo', this.elementRef.nativeElement.value);
      const newValue = unMaskNumberFormat(
        this.elementRef.nativeElement.value,
        this.unNumberMask.thousand_separator,
        this.unNumberMask.decimal_symbol
      );
      this.model.control.setValue(newValue, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false
      });
      console.log('valor desde la directiva', this.model.control.value);
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}