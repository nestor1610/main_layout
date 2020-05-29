import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';


@Injectable()
export class TableListSettingsService {

  constructor(public http: HttpClient) { }

  getTableListSettings(param) {
    return this.http.get(BananaConstants.urlServer + 'api/table/list', BananaHeader(param));
  }

  createTableListSetting(body) {
    return this.http.post(BananaConstants.urlServer + 'api/table/list/create', body, BananaHeader());
  }

  updateTableListSetting(body) {
    return this.http.put(BananaConstants.urlServer + 'api/table/list/update', body, BananaHeader());
  }

}
