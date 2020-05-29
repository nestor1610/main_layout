import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class MenuItemsService {

	constructor(public http: HttpClient) { }

	/**
	 * Obtiene las tablas a las que tiene acceso el usuario
	 * estas seran usadas en el menu - left side
	 *
	 * @returns
	 * @memberof MenuItemsService
	 */
	menuItems () {
		return this.http.get(BananaConstants.urlServer+'api/access/user/tables', BananaHeader());
	}

}
