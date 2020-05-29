import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class MigrationService {

  constructor(public http: HttpClient) { }

  getColumns (table_id) {
		return this.http.get(BananaConstants.urlServer + 'api/migration/columns/' + table_id, BananaHeader());
  }

  generateMigration(body){
    return this.http.post(BananaConstants.urlServer+'api/migration/generate', body, BananaHeader());
  }


}
