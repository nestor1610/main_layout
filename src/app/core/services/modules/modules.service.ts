import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class ModulesService {

  constructor(public http: HttpClient) { }

  getModules () {
    return this.http.get(BananaConstants.urlServer+'api/access/modules', BananaHeader());
  }

}
