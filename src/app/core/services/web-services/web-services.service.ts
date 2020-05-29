import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable({
  providedIn: 'root'
})
export class WebServicesService {

  column_headers: Array<any> = [
    // { type_column: 'options', tag: 'opciones', visible: 1 },
    { column_id: 1416, tag: 'id', key: 'id', visible: 1, type_column: 'id' },
    { column_id: 1417, tag: 'nombre', key: 'name', visible: 1 },
    { column_id: 1418, tag: 'descripcion', key: 'description', visible: 1 },
    { column_id: 1419, tag: 'url', key: 'url', visible: 1 },
    { column_id: 1420, tag: 'tipo_http', key: 'http_type', visible: 1 },
    { column_id: 1423, tag: 'tabla', key: 'table_name', visible: 1 }
  ];

  constructor(private http: HttpClient) { }

  getWebServices(params) {
    return this.http.get(BananaConstants.urlServer + 'api/web-services', BananaHeader(params));
  }

  getWebServiceById(id) {
    return this.http.get(BananaConstants.urlServer + 'api/web-service/get/' + id, BananaHeader());
  }

  search(params) {
    return this.http.get(BananaConstants.urlServer + 'api/web-services/search', BananaHeader(params));
  }

  resources() {
    return this.http.get(BananaConstants.urlServer + 'api/web-services/resources', BananaHeader());
  }

  createWebService(web_service) {
    return this.http.post(BananaConstants.urlServer + 'api/web-service/create', web_service, BananaHeader());
  }

  updateWebService(web_service) {
    return this.http.put(BananaConstants.urlServer + 'api/web-service/update', web_service, BananaHeader());
  }

  archivedWebService(web_service) {
    return this.http.put(BananaConstants.urlServer + 'api/web-service/archived', web_service, BananaHeader());
  }

  deleteWebService(id) {
    return this.http.delete(BananaConstants.urlServer + 'api/web-service/delete/' + id, BananaHeader());
  }
}
