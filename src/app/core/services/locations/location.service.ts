import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class LocationService {

	constructor(public http: HttpClient) { }

	getCountries () {
		return this.http.get(BananaConstants.urlServer+'api/location/countries', BananaHeader());
	}

	getStates (country_id) {
		const params = {country_id: country_id}
		return this.http.get(BananaConstants.urlServer+'api/location/states', BananaHeader(params));
	}

	getCities (state_id) {
		const params = {state_id: state_id}
		return this.http.get(BananaConstants.urlServer+'api/location/cities', BananaHeader(params));
	}

}
