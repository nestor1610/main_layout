import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class TablesService {

  constructor(private http: HttpClient) { }

  getTables () {
    return this.http.get(BananaConstants.urlServer + 'api/tables', BananaHeader());
  }

  getColumnsTable (table_id) {
    return this.http.get(BananaConstants.urlServer + 'api/table/columns/' + table_id, BananaHeader());
  }

}
