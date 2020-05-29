import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class PricesListService {

  constructor(public http:HttpClient) {}

  getPriceLists (params) {
		return this.http.get(BananaConstants.urlServer+'api/price-lists', BananaHeader(params));
  }

  getPriceList (id) {
    return this.http.get(BananaConstants.urlServer+'api/price-list/'+id, BananaHeader());
  }

  getResources(){
    return this.http.get(BananaConstants.urlServer+'api/price-lists/resources', BananaHeader());
  }

  createPriceList (body) {
    return this.http.post(BananaConstants.urlServer+'api/price-lists/create', body, BananaHeader(body));
  }

  updatePriceList (body) {
    return this.http.put(BananaConstants.urlServer+'api/price-lists/update', body, BananaHeader() );
  }

  archivedPriceList (body) {
    return this.http.put(BananaConstants.urlServer+'api/price-lists/archived', body, BananaHeader());
  }

  deletePriceList (event) {
    return this.http.delete(BananaConstants.urlServer+'api/price-lists/delete/'+event, BananaHeader());
  }

  removePrices (event) {
    return this.http.put(BananaConstants.urlServer+'api/prices/delete', event, BananaHeader());
  }

  search(params){
    return this.http.get(BananaConstants.urlServer+'api/price-lists/search', BananaHeader(params));
  }


    /**
   *Busqueda por lista de precio
   *
   * @param {*} keyword
   * @returns
   * @memberof ProductsService
   */
  searchByPriceList () {
		return this.http.get(BananaConstants.urlServer+'api/prices/get-prices/tax', BananaHeader());
	}

}
