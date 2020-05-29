import { Pipe, PipeTransform } from '@angular/core';
import { Setting } from '../../models/setting';

@Pipe({name: 'numberMask'})
export class NumberMaskPipe implements PipeTransform {
  transform(value: any, setting: Setting): string {
    let currencySign: string = '';
    let chunkLength: number = 3;

    // value /= 100;

    let result = '\\d(?=(\\d{' + chunkLength + '})+' + (setting.decimal_limit > 0 ? '\\D' : '$') + ')';
    let num = parseFloat(value).toFixed(Math.max(0, ~~setting.decimal_limit));

    return currencySign+(setting.decimal_symbol ? num.replace('.', setting.decimal_symbol) : num).replace(new RegExp(result, 'g'), '$&' + setting.thousands_separator);
  }
}