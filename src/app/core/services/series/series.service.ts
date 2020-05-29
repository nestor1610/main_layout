import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';
import { groupByParent } from '../../../shared/utils/arrayUtil';

@Injectable()
export class SeriesService {

  column_headers: Array<any> = [
    { type_column: 'options', tag: 'opciones', visible: 1 },
    { column_id: 758, tag: 'id', key: 'id', visible: 1, type_column: 'id' },
    { column_id: 759, tag: 'nombre', key: 'name', visible: 1 },
    { column_id: 760, tag: 'serie', key: 'serie', visible: 1 },
    { column_id: 761, tag: 'contador', key: 'counter', visible: 1 },
    { column_id: 964, tag: 'usuario', key: 'user_name', visible: 1 },
    { column_id: 1334, tag: 'serie_padre', key: 'parent_serie_id', visible: 1 },
    { column_id: 1335, tag: 'referencia', key: 'reference_no', visible: 1 },
    { column_id: 1337, tag: 'por_defecto', key: 'is_default_serie', visible: 1 },
    { column_id: 1338, tag: 'direccion', key: 'address', visible: 1 },
    { column_id: 1339, tag: 'ciudad', key: 'city', visible: 1 },
    { column_id: 1340, tag: 'estado', key: 'state', visible: 1 },
    { column_id: 1341, tag: 'pais', key: 'country', visible: 1 },
    { column_id: 1342, tag: 'postal', key: 'postal', visible: 1 },
    { column_id: 1343, tag: 'telefono_1', key: 'phone', visible: 1 },
    { column_id: 1344, tag: 'telefono_2', key: 'phone2', visible: 1 },
    { column_id: 1345, tag: 'descripcion', key: 'description', visible: 1 },
    { column_id: 1346, tag: 'email', key: 'email', visible: 1 },
    { column_id: 1347, tag: 'impuesto', key: 'tax_name', visible: 1 },
    { column_id: 1348, tag: 'libre_impuesto', key: 'is_tax_exempt', visible: 1, type_column: 'boolean' },
    { column_id: 1349, tag: 'libre_impuesto_compra', key: 'is_po_tax_exempt', visible: 1, type_column: 'boolean' }
  ];

  constructor(private http: HttpClient) { }

  groupBySerieParent(series: Array<any>, key_parent: string = 'parent_serie_id') {
    return groupByParent(series, key_parent);
  }

  getSeries(params) {
    return this.http.get(BananaConstants.urlServer + 'api/series', BananaHeader(params));
  }

  search(params) {
    return this.http.get(BananaConstants.urlServer + 'api/series/search', BananaHeader(params));
  }

  getSeriesByOrganization(params) {
    return this.http.get(BananaConstants.urlServer + 'api/series/list', BananaHeader(params));
  }

  createSerie(serie) {
    return this.http.post(BananaConstants.urlServer + 'api/serie/create', serie, BananaHeader());
  }

  updateSerie(serie) {
    return this.http.put(BananaConstants.urlServer + 'api/serie/update', serie, BananaHeader());
  }

  archivedSerie(serie) {
    return this.http.put(BananaConstants.urlServer + 'api/serie/archived', serie, BananaHeader());
  }

  deleteSerie(id) {
    return this.http.delete(BananaConstants.urlServer + 'api/serie/delete/' + id, BananaHeader());
  }
}
