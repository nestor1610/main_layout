import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class CountriesService {

  constructor(public http: HttpClient) { }

	getCountries (params) {
		return this.http.get(BananaConstants.urlServer+'api/countries', BananaHeader(params));
  }

  search (filter) {
		return this.http.get(BananaConstants.urlServer+'api/countries/filter', BananaHeader(filter));
	}
  
  createCountry (body) {
    return this.http.post(BananaConstants.urlServer+'api/countries/create', body, BananaHeader());
  }

  updateCountry (body) {
    return this.http.put(BananaConstants.urlServer+'api/countries/update', body, BananaHeader() );
  }

  archivedCountry (body) {
    return this.http.put(BananaConstants.urlServer+'api/countries/archived', body, BananaHeader());
  }

  deleteCountry (event) {
    return this.http.delete(BananaConstants.urlServer+'api/countries/delete/'+event, BananaHeader());
  }

}
