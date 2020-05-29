import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class ManufacturesService {

  constructor(public http: HttpClient) { }

  search (params) {
		return this.http.get(BananaConstants.urlServer+'api/manufacturers/search', BananaHeader(params));
	}

  getManufacturers(param){
    return this.http.get(BananaConstants.urlServer+'api/manufacturers', BananaHeader(param))
  }

  createManufacturer(body){
    return this.http.post(BananaConstants.urlServer+'api/manufacturers/create', body, BananaHeader())
  }

  updateManufacturer(body){
      return this.http.put(BananaConstants.urlServer+'api/manufacturers/update', body, BananaHeader())
  }

  deleteManufacturer(id){
      return  this.http.delete(BananaConstants.urlServer+'api/manufacturers/delete/'+id, BananaHeader())
  }

  archivedManufacturer(body){
      return this.http.put(BananaConstants.urlServer+'api/manufacturers/archived', body, BananaHeader())
  }

  
}
