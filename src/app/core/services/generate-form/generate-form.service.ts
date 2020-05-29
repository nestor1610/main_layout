import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicInputInterface } from 'src/app/shared/interfaces/DynamicInput';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';
import { cloneObject } from 'src/app/shared/utils/cloneObject';

@Injectable()
export class GenerateFormService {
  private url: string = BananaConstants.urlServer;

  /* column_headers: Array<any> = [
    { column_id: 1351, tag: 'id', key: 'id', visible: 1, type_column: 'id' },
    { column_id: 1352, tag: 'nombre', key: 'name', visible: 1 },
    { column_id: 1374, tag: 'tipo_form', key: 'type_form_name', visible: 1 },
    { column_id: 1375, tag: 'nombre_tabla', key: 'table_name', visible: 1 },
    { column_id: 1376, tag: 'formulario_activo', key: 'is_active', visible: 1, type_column: 'boolean' }
  ]; */

  constructor(private http: HttpClient) { }

  /**
   * Crea un arreglo bidimensional con la estructura rows (filas) y dentro cols (columnas)
   *
   * @param {Array<DynamicInputInterface>} inputs Elementos del formulario
   * @param {number} [min_col=4] minimo de columnas en el formulario
   * @param {number} [max_col=12] maxmimo de columnas en el formulario
   * @param {string} [class_row='row'] clase de la fila
   * @param {string} [class_col='col-md-'] clse de la columna
   * @returns
   * @memberof GenerateFormService
   */
  groupElementsInRow(inputs: Array<DynamicInputInterface>, min_col = 4, max_col = 12, class_row = 'row', class_col = 'col-md-') {
    let rows: Array<any> = [];
    let cols: Array<any> = [];
    let cont_col = max_col;
    let array_to_grouped: Array<any> = [];

    inputs.forEach(input => {
      if (input.belongs_table == 0) array_to_grouped.push(input);
    });

    for (let index = 0; index < array_to_grouped.length; index++) {

      let current_input = cloneObject(array_to_grouped[index]);
      let current_number_col = max_col / min_col;

      if (current_input.number_col != null) {
        current_number_col = (current_input.number_col > max_col ? max_col : current_input.number_col);
        cont_col -= current_number_col;
        current_input.class_col = class_col + current_number_col;
      } else {
        cont_col -= current_number_col;
        current_input.class_col = class_col + current_number_col;
      }

      if (cont_col >= 0) {
        cols.push(current_input);
      } else if (cont_col < 0) {
        rows.push({
          class_row: class_row,
          cols: cloneObject(cols)
        });
        cols.splice(0);
        cont_col = (max_col - current_number_col);
        cols.push(current_input);
      }

      if (cont_col <= 0) {
        rows.push({
          class_row: class_row,
          cols: cloneObject(cols)
        });
        cols.splice(0);
        cont_col = max_col;
      } else if ((index + 1) === array_to_grouped.length) {
        rows.push({
          class_row: class_row,
          cols: cloneObject(cols)
        });
      }
      
    }

    return rows;
  }

  /**
   * Obtiene el id de formulario o lista de datos segun el tipo
   *
   * @param {number} type
   * @param {Array<number>} form_dataTable_ids
   * @returns
   * @memberof GenerateFormService
   */
  getIdByTypeGenerate(type: number, form_dataTable_ids: Array<number>) {
    let id: number;

    switch (type) {
      case 1:
        id = form_dataTable_ids[0];
        break;
      case 2:
        id = form_dataTable_ids[1];
        break;
    }

    return id;
  }

  /**
   * Obtiene los formularios o listas de datos segun el tipo
   *
   * @param {*} params
   * @param {number} type
   * @returns
   * @memberof GenerateFormService
   */
  getFormsOrDataTables(params, type: number) {
    let route: string;

    switch (type) {
      case 1:
        route = this.url + 'api/forms';
        break;

      case 2:
        route = this.url + 'api/data-tables';
        break;
    }

    return this.http.get(route, BananaHeader(params));
  }

  /**
   * Obtiene un formulario o lista de datos segun su tipo
   *
   * @param {*} id
   * @param {number} type
   * @returns
   * @memberof GenerateFormService
   */
  getFormOrDataTable(id, type: number) {
    let route: string;

    switch (type) {
      case 1:
        route = this.url + 'api/form/by/' + id;
        break;

      case 2:
        route = this.url + 'api/data-table/by/' + id;
        break;
    }

    return this.http.get(route, BananaHeader());
  }

  /**
   * Obtiene los recursos de formulario o lista de datos
   *
   * @param {number} type
   * @returns
   * @memberof GenerateFormService
   */
  getResources(type: number) {
    let route: string;

    switch (type) {
      case 1:
        route = this.url + 'api/forms/resources';
        break;

      case 2:
        route = this.url + 'api/data-tables/resources';
        break;
    }

    return this.http.get(route, BananaHeader());
  }

  /**
   * Obtiene los elementos de un formulario
   *
   * @param {*} params
   * @returns
   * @memberof GenerateFormService
   */
  getElementsForm(form_id) {
    return this.http.get(BananaConstants.urlServer + 'api/form/elements/' + form_id, BananaHeader());
  }

  /**
   * Obtiene los elementos de una lista de datos
   *
   * @param {*} table_id
   * @returns
   * @memberof GenerateFormService
   */
  getElementsTableList(table_id) {
    return this.http.get(BananaConstants.urlServer + 'api/data-table/active', BananaHeader({
      table_id: table_id
    }));
  }

  /**
   * Cambia la posicion de los elementos de una lista de datos generada. El orden es por cada usuario
   *
   * @param {*} elements
   * @returns
   * @memberof GenerateFormService
   */
  changePositionElementsTableList(elements) {
    return this.http.put(BananaConstants.urlServer + 'api/data-table/position/update', { elements: elements }, BananaHeader());
  }

  /**
   * Crea un formulario o lista de datos segun su tipo
   *
   * @param {*} body
   * @param {number} type
   * @returns
   * @memberof GenerateFormService
   */
  createFormOrDataTable(body, type: number) {
    let route: string;

    switch (type) {
      case 1:
        route = this.url + 'api/form/create';
        break;

      case 2:
        route = this.url + 'api/data-table/create';
        break;
    }

    return this.http.post(route, body, BananaHeader());
  }

  /**
   * Actualiza un formulario o lista de datos segun su tippo
   *
   * @param {*} body
   * @param {number} type
   * @returns
   * @memberof GenerateFormService
   */
  updateFormOrDataTable(body, type: number) {
    let route: string;

    switch (type) {
      case 1:
        route = this.url + 'api/form/update';
        break;

      case 2:
        route = this.url + 'api/data-table/update';
        break;
    }

    return this.http.put(route, body, BananaHeader());
  }

  /**
   * Elimina un formulario o lista de datos segun su id y tipo
   *
   * @param {*} id
   * @param {number} type
   * @returns
   * @memberof GenerateFormService
   */
  deleteFormOrDataTable(id, type: number) {
    let route: string;

    switch (type) {
      case 1:
        route = this.url + 'api/form/delete/' + id;
        break;

      case 2:
        route = this.url + 'api/data-table/delete/' + id;
        break;
    }

    return this.http.delete(route, BananaHeader());
  }

  /**
   * servicio generico
   * 
   * Hace la peticion a una api o servicio web segun los parametros necesarios
   *
   * @param {string} url ruta de la api o servicio
   * @param {*} body cuerpo de la peticion
   * @param {('get' | 'post' | 'put' | 'delete')} httpType tipo de peticion HTTP
   * @returns
   * @memberof GenerateFormService
   */
  generateService(url: string, body: any, httpType: 'get' | 'post' | 'put' | 'delete') {

    switch (httpType) {
      case 'get':
        return this.http.get(url, BananaHeader(body));

      case 'post':
        return this.http.post(url, body, BananaHeader());

      case 'put':
        return this.http.put(url, body, BananaHeader());

      case 'delete':
        return this.http.delete(url, BananaHeader());
    }


  }


}
