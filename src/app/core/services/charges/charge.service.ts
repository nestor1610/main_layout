import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class ChargeService {

  constructor(
		public http: HttpClient,
	) { }

  search (params) {
    return this.http.get(BananaConstants.urlServer+'api/charges/filter', BananaHeader(params));
  }

  chargeList () {
		return this.http.get(BananaConstants.urlServer+'api/charges/list', BananaHeader());
	}

  getCharges (params) {
    return this.http.get(BananaConstants.urlServer+'api/charges', BananaHeader(params));
  }

  createCharge (charge) {
    return this.http.post(BananaConstants.urlServer+'api/charges/store', charge, BananaHeader());
  }

  updateCharge (charge) {
    return this.http.put(BananaConstants.urlServer+'api/charges/update', charge, BananaHeader());
  }

  deleteCharge (id) {
    return this.http.delete(BananaConstants.urlServer+'api/charges/delete/'+id, BananaHeader());
  }

}
