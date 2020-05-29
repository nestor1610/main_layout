import { Setting, SettingSale } from "./setting";

export class Third {
  id : number = 0;
  archived: number = 0;
  cif : string = '';
  logo : string = '';
  is_customer : number = 0;
  is_vendor : number = 0;
  alias : string = '';
  name : string = '';
  name_2 : string = '';
  is_employee : number = 0;
  is_prospect : number = 0;
  is_sales_rep : number = 0;
  reference_no : string = '';
  sales_rep_id : number = null;
  credit_status : string = '';
  credit_limit : number = 0;
  tax_id : number = null;
  is_tax_exempt : number = 0;
  is_po_tax_exempt : number = 0;
  url : string = '';
  email : string = '';
  description : string = '';
  is_summary : number = 0;
  price_list_id : number = null;
  delivery_rule : string = '';
  delivery_via_rule : string = '';
  flat_discount : number = 0;
  is_manufacturer : number = 0;
  po_price_list_id : number = null;
  language_id : number = null;
  greeting_id : number = null;
  currency_id : number = null;
  customAttr:any[] = [];

  constructor (setting: Setting = null, setting_sale: SettingSale = null) {
    if (setting !== null) {
      this.currency_id = setting.currency_id;
    }
    if (setting_sale !== null) {
      this.price_list_id = setting_sale.price_list_id;
    }
  }
}
