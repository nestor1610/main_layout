import { Setting } from "./setting";

export class Pricelist {
  id: number = 0;
  reference: string = '';
  name: string = '';
  valid_from: string = '';
  valid_until: string = '';
  tax_include: number = 0;
  currency_id: number = null;
  alternative: number = null;
  tax_id: number = null;

  constructor (setting: Setting = null) {
    var now =  new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1 < 10) ? '0'+ (now.getMonth() + 1) : now.getMonth() + 1;
    var day = (now.getDate() < 10) ? '0'+now.getDate() : now.getDate();
    this.valid_from = this.valid_until = year+'-'+month+'-'+day;

    if (setting !== null) {
      this.currency_id = setting.currency_id;
    }
  }
}

export class Price {
  selected: boolean = false;
  id: number = 0;
  price_list_id: number = 0;
  product_detail_id: number = 0;
  name: string = '';
  grossprice: any = '0';
  discount: string = '0';
  discount_calc: any = '0';
  netprice: any = '0';

  constructor (price_list_id, product_detail_id, name, grossprice, discount, discount_calc, netprice, setting: Setting) {
    this.price_list_id = price_list_id;
    this.product_detail_id = product_detail_id;
    this.name = name;

    if ( grossprice !== undefined ) {
      this.grossprice = grossprice.toString().replace('.', setting.decimal_symbol);
      this.discount = discount;
      this.discount_calc = discount_calc.toString().replace('.', setting.decimal_symbol);
      this.netprice = netprice.toString().replace('.', setting.decimal_symbol);
    }
  }
}