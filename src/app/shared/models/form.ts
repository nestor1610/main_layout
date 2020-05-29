export class Form {
  id: number = null;
  name: string = null;
  have_table: number = 0;
  type_form_id: number = null;
  table_id: number = null;
  is_active: number = 0;
  tables_columns: string = null;
  list_service_id: number = null;
  list_structure: string = null;
  list_response: string = null;
  get_service_id: number = null;
  get_structure: string = null;
  get_response: string = null;
  create_service_id: number = null;
  create_structure: string = null;
  create_response: string = null;
  update_service_id: number = null;
  update_structure: string = null;
  update_response: string = null;
  delete_service_id: number = null;
  delete_structure: string = null;
  delete_response: string = null;
  search_service_id: number = null;
  search_structure: string = null;
  search_response: string = null;
  archive_service_id: number = null;
  archive_structure: string = null;
  archive_response: string = null;
  resources_service_id: number = null;
  resources_structure: string = null;
  resources_response: string = null;
}

export class ColumnForm {
  id: number = null;
  column_id: any = null;
  form_id: any = null;
  input_type_id: string = null;
  tag: string = null;
  show: number = 1;
  disabled: number = 0;
  form_group_name: string = null;
  number_col: number = null;
  position: number = null;
  required: number = 0;
  belongs_table: number = 0;

  constructor (id: number, column_id = null, input_type_id = null) {
    this.form_id = id;
    this.column_id = column_id;
    this.input_type_id = (input_type_id || 1);
  }
}

export class DataTable {
  id: number = null;
  name: string = null;
  table_id: number = null;
  is_active: number = 0;
  tables_columns: string = null;
}

export class ColumnDataTable {
  id: number = null;
  column_id: number = null;
  data_table_id: number = null;
  column_type_id: number = 1;
  column_param: string = null;
  disabled: number = 0;
  key: string = null;
  tag: string = null;
  visible: number = 1;
  width: string = null;
  position: number = null;

  constructor (id: number, column_id = null, key = null) {
    this.data_table_id = id;
    this.column_id = column_id;
    this.key = key;
  }
}
