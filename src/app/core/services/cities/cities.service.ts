import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class CitiesService {

  constructor(public http: HttpClient) { }

  getCities (id) {
    return this.http.get(BananaConstants.urlServer+'api/cities', BananaHeader(id));
  }

  search (filter) {
		return this.http.get(BananaConstants.urlServer+'api/cities/filter', BananaHeader(filter));
	}

  create (body) {
    return this.http.post(BananaConstants.urlServer+'api/cities/create', body, BananaHeader());
  }

  update (body) {
    return this.http.put(BananaConstants.urlServer+'api/cities/update', body, BananaHeader() );
  }

  archived (body) {
    return this.http.put(BananaConstants.urlServer+'api/cities/archived', body, BananaHeader());
  }

  delete (event) {
    return this.http.delete(BananaConstants.urlServer+'api/cities/delete/'+event, BananaHeader());
  }

}
