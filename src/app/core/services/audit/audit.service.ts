import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class AuditService {

	constructor(public http: HttpClient) { }

	getAuditFilter(param) {
		return this.http.get(BananaConstants.urlServer+'api/audit/filter', BananaHeader(param));
  }

  getTablesAudit(param) {
		return this.http.get(BananaConstants.urlServer+'api/audit/getTablesAudit', BananaHeader(param));
  }

  getElements() {
		return this.http.get(BananaConstants.urlServer+'api/audit/getElements', BananaHeader());
  }


  getTrackByContext(param) {
		return this.http.get(BananaConstants.urlServer+'api/audit/getTrackByContext', BananaHeader(param));
	}
}
