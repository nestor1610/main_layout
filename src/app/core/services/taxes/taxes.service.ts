import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';


@Injectable()
export class TaxesService {

  constructor(public http:HttpClient) { }

  getTaxes (params) {
    return this.http.get(BananaConstants.urlServer+'api/taxes', BananaHeader(params));
  }

  createTax (body) {
    return this.http.post(BananaConstants.urlServer+'api/taxes/create', body, BananaHeader());
  }

  updateTax (body) {
    return this.http.put(BananaConstants.urlServer+'api/taxes/update', body, BananaHeader() );
  }

  deleteTax (event) {
    return this.http.delete(BananaConstants.urlServer+'api/taxes/delete/'+event, BananaHeader());
  }

  search(params){
    return this.http.get(BananaConstants.urlServer+'api/taxes/search',BananaHeader(params));
  }
}
