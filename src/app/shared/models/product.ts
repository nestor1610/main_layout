import { Setting } from "./setting";

export class Product {
  id: number = 0;
  reference: string = '';
  name: string = '';
  description: string = '';
  type: string = 'P';
  is_salable: number = 1;
  is_purchasable: number = 1;
  unit_id: number = null;
  category_id: number = null;
  manufacture_id: number = null;
  tax_id: number = null;
  archived: number = 0;
  is_combination: number = 0;

  constructor (setting: Setting = null) {
    if (setting !== null) {
      this.unit_id = setting.unit_id;
      this.manufacture_id = setting.manufacturer_id;
      this.tax_id = setting.tax_id;
    }
  }
}

export class ProductDetail {
  id: number = 0;
  reference: string = '';
  product_id: number = 0;
  name: string = '';
  sku: string = '';
  ean13: string = '';
  upc: string = '';
  cost: number = 0.00;
  sale_price: number = 0.00;
  condition_id: number = null;
  price_list_id: number = null;
  archived: number = 0;
  image: string = null;
  attribute_details: Array<number> = [];
  edit: boolean = false;
  more: boolean = true;

  constructor (product_id) {
    this.product_id = product_id;
  }
}