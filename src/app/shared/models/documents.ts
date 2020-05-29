export class HeaderProject {
  id: number = 0;
  bpartner_id: number = null;
  organization_id: number | string = null;
}

export class Document {
  id: number = 0;
  counter_serie_id: number = null;
  bpartner_id: number = null;
  reference: string = '';
  header_project_id: number = null;
  address: string = '';
  valid_from: string = '';
  valid_until: string = '';
  warehouse_id: number = null;
  sale_represent_id: number = null;
  price_list_id: number = null;
  currency_client: number = null;
  currency_document: number = null;
  rate: any = '1';
  // Cuando se crea un documento se establece que tiene el estado 1 "Pendiente"
  status_id: number = 1;
  based: boolean = false;

  constructor () {
    var now =  new Date();
    //Año
    var year = now.getFullYear();
    //Mes
    var month = (now.getMonth() + 1 < 10) ? '0'+ (now.getMonth() + 1) : now.getMonth() + 1;
    //Día
    var day = (now.getDate() < 10 ) ? '0'+now.getDate() : now.getDate();

    this.valid_from = this.valid_until = year+'-'+month+'-'+day;
  }
}

export class BodyDocument {
  id: number = 0;
  reference_document: string = null;
  reference: string = '';
  product_detail_id: number = null;
  name: string = '';
  price: any = '0';
  net_price: any = '0';
  dimensions: any = '1';
  quantity: any = '1';
  quantity_processed: any = '0';
  quantity_to_process: any = '0';
  discount: any = '0';
  discount_cal: any = '0';
  tax_id: number = null;
  sale_rep_id: number = null;
  warehouse_id: number = null;
  origin_document: string = null;
  origin_row: number = null;

  constructor (document: Document) {
    this.reference_document = document.reference;
  }
}

export class FooterDocument {
  id: number = 0;
  reference_document: string = null;
  quantity_total: any = 0;
  gross_total: any = 0;
  discount_total: any = 0;
  tax_total: any = 0;
  neto_total: any = 0;
  internal_note: string = '';
  client_note: string = '';
}

export class DiscountFooterDocument {
  id: number = 0;
  discount: string = '0';
  discount_cal: any = 0;
  remainder: any = 0;
  description: string = '';
  footer_document_id: number = 0;

  constructor (footer: FooterDocument) {
    this.footer_document_id = footer.id
  }
}