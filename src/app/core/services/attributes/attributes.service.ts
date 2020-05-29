import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class AttributesService {

	constructor(public http: HttpClient) { }

	search (params) {
		return this.http.get(BananaConstants.urlServer+'api/attributes/filter', BananaHeader(params));
	}

	getAttributes (params) {
		return this.http.get(BananaConstants.urlServer+'api/attributes', BananaHeader(params));
	}

	getListAttributes () {
		return this.http.get(BananaConstants.urlServer+'api/attributes/list', BananaHeader());
	}

	getAttribute (id) {
		return this.http.get(BananaConstants.urlServer+'api/attribute/'+id, BananaHeader());
	}

	createAttribute (attribute) {
		return this.http.post(BananaConstants.urlServer+'api/attributes/create', attribute, BananaHeader());
	}

	updateAttribute (attribute) {
		return this.http.put(BananaConstants.urlServer+'api/attributes/update', attribute, BananaHeader());
	}

	createAttributeDetail (attribute) {
		return this.http.post(BananaConstants.urlServer+'api/attributes/detail/create', attribute, BananaHeader());
	}

	updateAttributeDetail (attribute) {
		return this.http.put(BananaConstants.urlServer+'api/attributes/detail/update', attribute, BananaHeader());
	}

	deleteAttribute (id) {
		return this.http.delete(BananaConstants.urlServer+'api/attributes/delete/'+id, BananaHeader());
	}

	deleteAttributeDetail (id) {
		return this.http.delete(BananaConstants.urlServer+'api/attributes/detail/delete/'+id, BananaHeader());
	}

}
