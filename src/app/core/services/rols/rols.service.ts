import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';
import { forkJoin } from 'rxjs';

@Injectable()
export class RolsService {

	constructor(public http: HttpClient) { }

	getRols (params) {
		return this.http.get(BananaConstants.urlServer+'api/rols', BananaHeader(params));
	}

	search (filter) {
		return this.http.get(BananaConstants.urlServer+'api/rols/filter', BananaHeader(filter));
	}

	archivedRol (body) {
		return this.http.put(BananaConstants.urlServer+'api/rols/archived', body, BananaHeader());
	}

	getRol (id, params) {
		let rol = this.http.get(BananaConstants.urlServer+'api/rol/'+id, BananaHeader());
		let permissions = this.http.get(BananaConstants.urlServer+'api/rols/getPermission', BananaHeader(params));
		return forkJoin([rol, permissions]);
	}

	getPermissions (params) {
		return this.http.get(BananaConstants.urlServer+'api/rols/getPermission', BananaHeader(params));
	}

	createRol (rol) {
		return this.http.post(BananaConstants.urlServer+'api/rols/create', rol, BananaHeader());
	}

	updateRol (rol) {
		return this.http.put(BananaConstants.urlServer+'api/rols/update', rol, BananaHeader());
	}

	deleteRol (id) {
		return this.http.delete(BananaConstants.urlServer+'api/rols/delete/'+id, BananaHeader());
	}

}