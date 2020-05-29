import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class ThirdsService {
  column_headers: Array<any> = [
    { type_column: 'options', tag: 'opciones', visible: 1 },
    { column_id: 81, tag: 'razon_social', key: 'name', position: 3, visible: 1 },
    { column_id: 82, tag: 'nombre_comercial', key: 'name_2', position: 3, visible: 0, principal: true },
    { column_id: 76, tag: 'id', key: 'id', position: 1, visible: 0, type_column: 'id' },
    { column_id: 262, tag: 'rif', key: 'cif', position: 2, visible: 1 },
    { column_id: 78, tag: 'logo', key: 'logo', position: 3, visible: 0, type_column: 'image' },
    { column_id: 678, tag: 'alias', key: 'alias', position: 3, visible: 0 },
    { column_id: 679, tag: 'correo', key: 'email', position: 3, visible: 0 },
    { column_id: null, tag: 'tipo_tercero', key: 'type_third', position: 3, visible: 1 },
    { column_id: 86, tag: 'nro_referencia', key: 'reference_no', position: 3, visible: 0 },
    { column_id: 87, tag: 'representante_venta', key: 'represent_name', position: 3, visible: 0 },
    { column_id: 88, tag: 'estatus_credito', key: 'credit_status', position: 3, visible: 0 },
    { column_id: 89, tag: 'limite_credito', key: 'credit_limit', position: 3, visible: 0 },
    { column_id: 90, tag: 'balance_total', key: 'total_open_balance', position: 3, visible: 0 },
    { column_id: 91, tag: 'impuesto', key: 'tax_id', position: 3, visible: 0 },
    { column_id: 92, tag: 'exento_impuesto_venta', key: 'is_tax_exempt', position: 3, visible: 0 },
    { column_id: 93, tag: 'exento_impuesto_compra', key: 'is_po_tax_exempt', position: 3, visible: 0 },
    { column_id: 94, tag: 'url', key: 'url', position: 3, visible: 0 },
    { column_id: 95, tag: 'descripcion', key: 'description', position: 3, visible: 0 },
    { column_id: 96, tag: 'resumen', key: 'is_summary', position: 3, visible: 0, type_column: 'boolean' },
    { column_id: 98, tag: 'lista_precio_venta', key: 'price_list_id', position: 3, visible: 0 },
    { column_id: 99, tag: 'regla_entrega', key: 'delivery_rule', position: 3, visible: 0 },
    { column_id: 100, tag: 'regla_medio_entrega', key: 'delivery_via_rule', position: 3, visible: 0 },
    { column_id: 101, tag: 'descuento', key: 'flat_discount', position: 3, visible: 0 },
    { column_id: 102, tag: 'manufacturador', key: 'is_manufacturer', position: 3, visible: 0, type_column: 'boolean' },
    { column_id: 103, tag: 'lista_precio_compra', key: 'po_price_list_id', position: 3, visible: 0 },
    { column_id: 104, tag: 'lenguaje', key: 'language_id', position: 3, visible: 0 },
    { column_id: 105, tag: 'saludo', key: 'greeting_id', position: 3, visible: 0 },
    { column_id: 432, tag: 'telefono_1', key: 'phone', position: 3, visible: 1 },
    { column_id: 433, tag: 'telefono_2', key: 'phone_2', position: 3, visible: 1 },
    { column_id: 186, tag: 'direccion', key: 'address', position: 3, visible: 1 },
    { column_id: 20, tag: 'pais', key: 'country', position: 3, visible: 1 },
    { column_id: 23, tag: 'estado', key: 'state', position: 3, visible: 1 },
    { column_id: 27, tag: 'ciudad', key: 'city', position: 3, visible: 1 },
    { column_id: 106, tag: 'creado', key: 'created_at', position: 3, visible: 0 },
    { column_id: 107, tag: 'actualizado', key: 'updated_at', position: 3, visible: 0 },
  ];

  constructor(public http: HttpClient) { }

  getCombo() {
    return this.http.get(BananaConstants.urlServer + 'api/thirds/combo-select', BananaHeader());
  }

  getThirds(params) {
    return this.http.get(BananaConstants.urlServer + 'api/thirds', BananaHeader(params));
  }

  getThirdsWhyBranch(params) {
    return this.http.get(BananaConstants.urlServer + 'api/thirds/why-branch', BananaHeader(params));
  }

  setTypeThird(thirds: any, lbl) {
    let type_third: string = '';
    let copy_array: Array<any> = [];
    let copy: any = {};

    if (Array.isArray(thirds)) {
      thirds.forEach(function (third) {

        if (third.is_customer) type_third += lbl.tags('cliente') + '.\n';
        if (third.is_vendor) type_third += lbl.tags('proveedor') + '.\n';
        if (third.is_prospect) type_third += lbl.tags('prospecto') + '.\n';
        if (third.is_sales_rep) type_third += lbl.tags('representante_venta') + '.\n';

        third.type_third = type_third;
        copy_array.push(third);
        type_third = '';
      });

      return copy_array;
    } else {

      if (thirds.is_customer) type_third += lbl.tags('cliente') + '.\n';
      if (thirds.is_vendor) type_third += lbl.tags('proveedor') + '.\n';
      if (thirds.is_prospect) type_third += lbl.tags('prospecto') + '.\n';
      if (thirds.is_sales_rep) type_third += lbl.tags('representante_venta') + '.\n';

      thirds.type_third = type_third;
      copy = thirds;
      type_third = '';

      return copy;
    }
  }

  getThird(id) {
    return this.http.get(BananaConstants.urlServer + 'api/third/' + id, BananaHeader());
  }

  createThird(body) {
    return this.http.post(BananaConstants.urlServer + 'api/thirds/create', body, BananaHeader());
  }

  updateThird(body) {
    return this.http.put(BananaConstants.urlServer + 'api/thirds/update', body, BananaHeader());
  }

  archivedThird(body) {
    return this.http.put(BananaConstants.urlServer + 'api/thirds/archived', body, BananaHeader());
  }

  deleteThird(id) {
    return this.http.delete(BananaConstants.urlServer + 'api/thirds/delete/' + id, BananaHeader());
  }

  search(keyword) {
    return this.http.get(BananaConstants.urlServer + 'api/thirds/filter', BananaHeader(keyword));
  }

  searchThirdWhyBranch(keyword) {
    return this.http.get(BananaConstants.urlServer + 'api/thirds/why-branch/search', BananaHeader(keyword));
  }

  searchByReference(keyword) {
    return this.http.get(BananaConstants.urlServer + 'api/thirds/search/reference', BananaHeader(keyword));
  }

  UpdateImge(body) {
    return this.http.post(BananaConstants.urlServer + 'api/thirds/save/image', body, BananaHeader({}, true));
  }

}
