import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class OrganizationsService {

  column_headers: Array<any> = [
    { type_column: 'options', tag: 'opciones', visible: 1 },
    { column_id: null, tag: 'id', key: 'id', position: 1, visible: 0, type_column: 'id' },
    { column_id: 261, tag: 'nro_referencia', key: 'reference_no', position: 2, visible: 1 },
    { column_id: 6, tag: 'nombre', key: 'name', position: 3, visible: 1 },
    { column_id: 7, tag: 'descripcion', key: 'description', position: 4, visible: 1 },
    { column_id: 1314, tag: 'rif', key: 'cif', position: 4, visible: 1 },
    { column_id: 1315, tag: 'telefono', key: 'phone', position: 4, visible: 1 },
    { column_id: 1316, tag: 'impuesto', key: 'tax_name', position: 4, visible: 1 },
    { column_id: null, tag: 'creado', key: 'created_at', position: 4, visible: 0 },
    { column_id: null, tag: 'actualizado', key: 'updated_at', position: 4, visible: 0 },
    { column_id: 186, tag: 'direccion', key: 'address', position: 3, visible: 1 },
    { column_id: 196, tag: 'pais', key: 'country', position: 3, visible: 1 },
    { column_id: 194, tag: 'estado', key: 'state', position: 3, visible: 1 },
    { column_id: 191, tag: 'ciudad', key: 'city', position: 3, visible: 1 },
  ];

  constructor(public http: HttpClient) { }

  organizationList() {
    return this.http.get(BananaConstants.urlServer + 'api/organizations/list', BananaHeader());
  }

  getResources() {
    return this.http.get(BananaConstants.urlServer + 'api/organizations/resources', BananaHeader());
  }

  getOrganizations(params) {
    return this.http.get(BananaConstants.urlServer + 'api/organizations', BananaHeader(params));
  }

  getOrganization(id) {
    return this.http.get(BananaConstants.urlServer + 'api/organization/' + id, BananaHeader());
  }

  search(keyword) {
    return this.http.get(BananaConstants.urlServer + 'api/organizations/filter', BananaHeader(keyword));
  }

  create(body) {
    return this.http.post(BananaConstants.urlServer + 'api/organizations/create', body, BananaHeader());
  }

  update(body) {
    return this.http.put(BananaConstants.urlServer + 'api/organizations/update', body, BananaHeader());
  }

  delete(id) {
    return this.http.delete(BananaConstants.urlServer + 'api/organizations/delete/' + id, BananaHeader());
  }

  archivedOrganization(body) {
    return this.http.put(BananaConstants.urlServer + 'api/organizations/archived', body, BananaHeader());
  }

  OrganizationByUser() {
    return this.http.get(BananaConstants.urlServer + 'api/organizations/byUser', BananaHeader());
  }

	/**
	 * Obtiene las organizaciones con la propiedad disabled.
	 *
	 * @param {Array<any>} Organizations
	 * @returns {Array<number>}
	 * @memberof OrganizationsService
	 */
  GetOrganizationsDisabled(list_organizations: Array<any>, organizations: Array<any> = []): Array<number> {
    let organization_disabled: Array<number> = [];

    for (let i = 0; i < list_organizations.length; i++) {

      if (list_organizations[i].hasOwnProperty('disabled')) {

        for (let j = 0; j < organizations.length; j++) {

          if (organizations[j] == list_organizations[i].id) {
            organization_disabled.push(list_organizations[i].id);
            break;
          }

        }
      }
    }

    return organization_disabled;

  }

}
