import { DynamicInputInterface } from "../interfaces/DynamicInput";
import { Localization } from "./localization";
import { Setting } from "./setting";

export class Serie {
  id: number = null;
  name: string = '';
  counter: number = 0;
  archived: number = 0;
  parent_serie_id: number = null;
  reference_no: string = '';
  organization_id: number = null;
  is_default_serie: number = 0;
  serie: string = '';
  address: string = '';
  city_id: number = null;
  state_id: number = null;
  country_id: number = null;
  postal: string = '';
  phone: string = '';
  phone2: string = '';
  description: string = '';
  user_id: number = null;
  email: string = '';
  tax_id: number = null;
  is_tax_exempt: number = 0;
  is_po_tax_exempt: number = 0;
  localization: Localization;

  constructor(setting: Setting = null) {
    this.organization_id = parseInt(sessionStorage.getItem('organization_id'));
    this.localization = new Localization(setting);
  }
}

export const guideSerie: Array<DynamicInputInterface> = [
  { key: 'id', input: 'text', tag: 'id', required: 0, show: 1, disabled: 1, belongs_table: 0, column_id: 758, number_col: null },
  { key: 'parent_serie_id', input: 'select', tag: 'serie_padre', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1334, number_col: null },
  { key: 'name', input: 'text', tag: 'nombre', required: 1, show: 1, disabled: 0, belongs_table: 0, column_id: 759, number_col: null },
  { key: 'serie', input: 'text', tag: 'serie', required: 1, show: 1, disabled: 0, belongs_table: 0, column_id: 760, number_col: null },
  { key: 'reference_no', input: 'text', tag: 'referencia', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1335, number_col: null },
  { key: 'user_id', input: 'select', tag: 'usuario', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 964, number_col: null },
  { key: 'email', input: 'email', tag: 'email', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1346, number_col: null },
  { key: 'counter', input: 'number', tag: 'contador', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 761, number_col: null },
  { key: 'phone', input: 'text', tag: 'telefono_1', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1343, number_col: 6 },
  { key: 'phone2', input: 'text', tag: 'telefono_2', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1344, number_col: 6 },
  { key: 'tax_id', input: 'select', tag: 'impuesto', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1347, number_col: null },
  { key: 'is_tax_exempt', input: 'checkbox', tag: 'libre_impuesto', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1348, number_col: null },
  { key: 'is_po_tax_exempt', input: 'checkbox', tag: 'libre_impuesto_compra', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1349, number_col: null },
  { key: 'description', input: 'textarea', tag: 'descripcion', required: 0, show: 1, disabled: 0, belongs_table: 0, column_id: 1345, number_col: 12 },
  // {key: 'archived', input: 'checkbox', tag: 'archivado', show: 0, disabled: 0, belongs_table: 0, column_id: null},
  // {key: 'organization_id', input: 'select', tag: 'organizacion', show: 0, disabled: 0, belongs_table: 0, column_id: 762},
  // {key: 'is_default_serie', input: 'checkbox', tag: 'por_defecto', show: 0, disabled: 0, belongs_table: 0, column_id: 1337},
  // {key: 'address', input: 'textarea', tag: 'direccion', show: 0, disabled: 0, belongs_table: 0, column_id: 1338},
  // {key: 'city_id', input: 'select', tag: 'ciudad', show: 0, disabled: 0, belongs_table: 0, column_id: 1339},
  // {key: 'state_id', input: 'select', tag: 'estado', show: 0, disabled: 0, belongs_table: 0, column_id: 1340},
  // {key: 'country_id', input: 'select', tag: 'pais', show: 0, disabled: 0, belongs_table: 0, column_id: 1341},
  // {key: 'postal', input: 'text', tag: 'postal', show: 0, disabled: 0, belongs_table: 0, column_id: 1342},
  {
    key: 'localization',
    input: 'localization',
    tag: 'direccion',
    required: 0, show: 1,
    disabled: 0, belongs_table: 0,
    column_id: {
      address: 1338,
      city_id: 1339,
      state_id: 1340,
      country_id: 1341,
      postal: 1342
    },
    number_col: 12,
  },
];
