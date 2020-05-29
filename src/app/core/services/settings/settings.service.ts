import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class SettingsService {

	constructor(public http: HttpClient) { }

	getSettings () {
		return this.http.get(BananaConstants.urlServer+'api/settings', BananaHeader());
	}

	getCombo (params) {
		return this.http.get(BananaConstants.urlServer+'api/settings/combo', BananaHeader(params));
	}

	createSettings (setting) {
		return this.http.post(BananaConstants.urlServer+'api/settings/create', setting, BananaHeader());
	}

	updateSettings (setting) {
		return this.http.put(BananaConstants.urlServer+'api/settings/update', setting, BananaHeader());
	}

}
