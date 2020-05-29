import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';
import {  cloneObject } from '../../../shared/utils/cloneObject';

@Injectable()
export class DocumentsService {
  // Cabecera de la tabla para documentos
  column_headers: Array<any> = [
    { column_id: null, tag: 'id', key: 'id', position: 1, visible: 0, type_column: 'id' },
    { column_id: null, tag: 'referencia', key: 'reference', position: 2, visible: 1 },
    { column_id: null, tag: 'serie', key: 'serie', position: 2, visible: 1 },
    { column_id: null, tag: 'direccion', key: 'address', position: 2, visible: 1 },
    { column_id: null, tag: 'neto_total', key: 'neto_total', position: 2, visible: 1, type_column: 'number_format' },
    { column_id: null, tag: 'valido_desde', key: 'valid_from', position: 2, visible: 1 },
    { column_id: null, tag: 'valido_hasta', key: 'valid_until', position: 2, visible: 1 },
    { column_id: 76, tag: 'tercero_id', key: 'third_id', position: 1, visible: 0 },
    { column_id: 908, tag: 'nombre_estatus', key: 'status_name', position: 2, visible: 1 },
    { column_id: 81, tag: 'nombre_tercero', key: 'third_name', position: 2, visible: 1 },
    { column_id: 86, tag: 'referencia_tercero', key: 'third_reference', position: 2, visible: 1 },
    { column_id: 262, tag: 'cif', key: 'cif', position: 2, visible: 1 },
  ];
  // Cabecera para la tabla de la traza de los documentos
  column_headers_trace: Array<any> = [
    { column_id: null, tag: 'nombre_documento', key: 'document_name', position: 2, visible: 1 },
    { column_id: null, tag: 'referencia', key: 'reference_document', position: 2, visible: 1 },
  ];
  // Arreglo de ids para la cabecera de las tablas de cotizacion, pedido de venta, nota de entrega
  ids_header_quotes: Array<number> = [1002, 1005, 1276, 1007, 1070, 1008, 1009];
  ids_header_orders: Array<number> = [1100, 1103, 1291, 1105, 1168, 1106, 1107];
  ids_header_deliveries: Array<number> = [1191, 1194, 1306, 1196, 1259, 1197, 1198];

  constructor(public http: HttpClient) { }


  getColumnHeadersByTypeDocument(type_document) {
    let clone_column_headers =  cloneObject(this.column_headers);
    let ids: Array<number>;

    switch (type_document) {
      case 1:
        ids = this.ids_header_quotes;
        break;
      case 2:
        ids = this.ids_header_orders;
        break;
      case 3:
        ids = this.ids_header_deliveries;
        break;
    }

    ids.forEach(function (id, index) {
      clone_column_headers[index].column_id = id;
    });

    return clone_column_headers;
  }

  /**
   * Retorna el id correspondiente segun el tipo de documento
   *
   * @param {number} type_document id del tipo de documento
   * @param {Array<number>} quote_order_delivery_ids arreglo del id de la columna de cotizacion, pedido de venta, nota de entrega
   * @memberof DocumentsService
   */
  getIdByTypeDocument(type_document: number, quote_order_delivery_ids: Array<number>) {
    let id: number;

    switch (type_document) {
      case 1:
        id = quote_order_delivery_ids[0];
        break;
      case 2:
        id = quote_order_delivery_ids[1];
        break;
      case 3:
        id = quote_order_delivery_ids[2];
        break;
    }

    return id;
  }

  getDocuments(params) {
    return this.http.get(BananaConstants.urlServer + 'api/documents', BananaHeader(params));
  }

  getTraceDocument(reference, params) {
    return this.http.get(BananaConstants.urlServer + 'api/documents/trace/' + reference, BananaHeader(params));
  }

  getDocument(reference, params) {
    return this.http.get(BananaConstants.urlServer + 'api/document/' + reference, BananaHeader(params));
  }

  searchDocuments(params) {
    return this.http.get(BananaConstants.urlServer + 'api/documents/search', BananaHeader(params));
  }

  getBodiesWhyStock(params) {
    return this.http.get(BananaConstants.urlServer + 'api/documents/bodies/why-stock', BananaHeader(params));
  }

  bodiesValidateOrPartiallyProcessed(params) {
    return this.http.get(BananaConstants.urlServer + 'api/documents/bodies/validate-partially-processed', BananaHeader(params));
  }

  getResources(params) {
    return this.http.get(BananaConstants.urlServer + 'api/documents/resources', BananaHeader(params));
  }

  createDocument(body) {
    return this.http.post(BananaConstants.urlServer + 'api/documents/create', body, BananaHeader());
  }

  createDocumentBased(body) {
    return this.http.post(BananaConstants.urlServer + 'api/documents/create/based', body, BananaHeader());
  }

  updateDocumentBased(body) {
    return this.http.put(BananaConstants.urlServer + 'api/documents/update/based', body, BananaHeader());
  }

  updateDocument(body) {
    return this.http.put(BananaConstants.urlServer + 'api/documents/update', body, BananaHeader());
  }

  deleteDocument(body, params) {
    return this.http.delete(BananaConstants.urlServer + 'api/documents/delete/' + body, BananaHeader(params));
  }

  changeStatus(body) {
    return this.http.put(BananaConstants.urlServer + 'api/documents/change/status', body, BananaHeader());
  }

}
