import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class UnitsService {

  constructor(public http:HttpClient) {}

  search (params) {
		return this.http.get(BananaConstants.urlServer+'api/metering-units/search', BananaHeader(params));
	}
  getUnits(param){
    return this.http.get(BananaConstants.urlServer+'api/metering-units', BananaHeader(param))
  }

  createUnit(body){
    return this.http.post(BananaConstants.urlServer+'api/metering-units/create', body,BananaHeader())
  }

  updateUnit(body){
    return this.http.put(BananaConstants.urlServer+'api/metering-units/update',body, BananaHeader())
  }

  deleteUnit(id){
    return this.http.delete(BananaConstants.urlServer+'api/metering-units/delete/'+id, BananaHeader())
  }

  archivedUnit(body){
    return this.http.put(BananaConstants.urlServer+'api/metering-units/archived',body, BananaHeader())
  }

}
