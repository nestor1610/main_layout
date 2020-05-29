export class TypeDocument {
  id: number = 0;
  name: string = '';
}

export class TypeDocumentSetting {
  show_header_serie: boolean = false;
  show_body_sales_rep: boolean = false;
  show_body_warehouse: boolean = false;
  edit_net_price: boolean = false;
}

export class CounterSerie {
  id: number = 0;
  edit: boolean = true;
  type_document_id: number = 0;
  serie: string = '';
  counter: number = 0;
  organization_id: number = null;
  user_id: number = null;

  constructor (type_document_id: number) {
  	this.type_document_id = type_document_id;
  }
}