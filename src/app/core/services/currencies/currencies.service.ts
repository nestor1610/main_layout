import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class CurrenciesService {

  constructor(public http:HttpClient) { }
  
  search (params) {
		return this.http.get(BananaConstants.urlServer+'api/currencies/search', BananaHeader(params));
	}

  getCurrencies (type){
    return this.http.get(BananaConstants.urlServer+'api/currencies', BananaHeader(type))
  }

  createCurrency(body){
    return this.http.post(BananaConstants.urlServer+'api/currencies/create',body,BananaHeader())
  }

  updateCurrency(body){
    return this.http.put(BananaConstants.urlServer+'api/currencies/update',body,BananaHeader())
  }

  deleteCurrency(id){
    return this.http.delete(BananaConstants.urlServer+'api/currencies/delete/'+id,BananaHeader())
  }

  archivedCurrency(body){
    return this.http.put(BananaConstants.urlServer+'api/currencies/archived',body, BananaHeader())
  }

}
