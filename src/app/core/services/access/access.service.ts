import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class AccessService {

  constructor(private http: HttpClient) { }
  
  /**
   * Peticion para login a Banana
   *
   * @param {{email:string,password:string}} body
   * @param {*} [header=BananaHeader()]
   * @returns
   * @memberof AccessService
   */
  login (body: {email:string,password:string|Int32Array}, header: any = BananaHeader()) {
    return this.http.post(BananaConstants.urlServer+'api/login', body, header)
  }

	/**
   * Logout banana
   *
   * @returns
   * @memberof AccessService
   */
  logout_banana () {
		return this.http.delete(BananaConstants.urlServer+'api/logout', BananaHeader());
	}
}
