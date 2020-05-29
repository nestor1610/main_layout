import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class StatesService {

  constructor(public http: HttpClient) { }

  getStates (id) {
    return this.http.get(BananaConstants.urlServer+'api/states', BananaHeader(id));
  }

  search (filter) {
		return this.http.get(BananaConstants.urlServer+'api/states/filter', BananaHeader(filter));
	}

  createState (body) {
    return this.http.post(BananaConstants.urlServer+'api/states/create', body, BananaHeader());
  }

  updateState (body) {
    return this.http.put(BananaConstants.urlServer+'api/states/update', body, BananaHeader() );
  }

  archivedState (body) {
    return this.http.put(BananaConstants.urlServer+'api/states/archived', body, BananaHeader());
  }

  deleteState (event) {
    return this.http.delete(BananaConstants.urlServer+'api/states/delete/'+event, BananaHeader());
  }

}
