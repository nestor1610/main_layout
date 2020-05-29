import { InputPayroll } from "./_input_payroll";
import { TaxonomyOption } from "../taxonomy/_taxonomy";



/**
 *
 *
 * @export
 * @class ProductPayroll
 */
export class ProductPayroll{

   tablesInfo = {
    productos:{
      id:23,
      BDname:"products",
      order:1,
      key:null,
      pairing:{
        reference:  null,
        name: null,
        description: null
      },
      taxonomyOptions: [
        "category_id"
      ]


    },
    detalle_producto:{id:34, BDname:"product_details",  order:2},
    stock:{id:52, BDname:"stocks" , order:3}
  }
  productos = {

    // id:  new InputPayroll(),
    reference:  new InputPayroll("referencia"),
    name:  new InputPayroll("nombre"),
    description:  new InputPayroll("descripcion"),
    type:  new InputPayroll("tipo"),
    is_salable:  new InputPayroll("vendible"),
    is_purchasable:  new InputPayroll("comprable"),
    unit_id:  new InputPayroll("unidad"),
    category_id:  new InputPayroll("categoria"),
    // category:  new InputPayroll(),
    manufacture_id:  new InputPayroll("manufacturador"),
    // manufacturer:  new InputPayroll(),
    tax_id:  new InputPayroll("impuesto")
  }


  /**
   * product details properties
   */
  detalle_producto={

    reference:  new InputPayroll("referencia"),
    // product_id:  new InputPayroll(),
    name:  new InputPayroll("nombre"),
    sku:  new InputPayroll("sku"),
    ean13:  new InputPayroll("ean13"),
    upc:  new InputPayroll("upc"),
    cost:  new InputPayroll("costo"),
    sale_price:  new InputPayroll("precio"),
    condition_id:  new InputPayroll("condicion"),
    price_list_id:  new InputPayroll("lista_de_precio"),
    image:  new InputPayroll("imagen")

  };

  /**
   * stock properties
   */
  stock ={
    warehouse_id :  new InputPayroll("almacen"),
    // product_id:  new InputPayroll(),
    real_stock:  new InputPayroll("real"),
    ordered_stock:  new InputPayroll("ordenado"),
    reserved_stock:  new InputPayroll("reservado"),
    available_stock:  new InputPayroll("disponible")
  }




}


// InputPayroll

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
  category:Category = new Category();
  manufacture_id: number = null;
  manufacturer:Manufacturer;
  tax_id: number = null;
  tax: Tax = new Tax();
  archived: number = 0;
  is_combination: number = 0;
  ProductDetails:ProductDetail[] = [new ProductDetail()];



}

export class Tax {
  id:string='';
  name:string='';
  print_name:string='';
  validfrom:string='';
  rate:number=0.0;
  notes:string;
}

export class Category
{
    id: number = 0;
    name: string = '';
    color : string = '#ffffff';
    parent_id: number = null;
    archived: number = 0;
}

export class Manufacturer
{
    id:number=0;
    name:string='';
    archived:number=0;

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
  stock:Stock = new Stock();
  attribute_details: Array<number> = [];

  constructor (product_id = null) {
      this.product_id = product_id;
  }
}

export class Stock
{
    id:number=0;
    warehouse_id :number = 0;
    product_id:number = 0;
    real_stock:number = 0;
    ordered_stock:number = 0;
    reserved_stock:number = 0;
    available_stock:number = 0;

}




