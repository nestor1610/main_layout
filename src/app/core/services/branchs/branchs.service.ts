import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class BranchsService {

  constructor(public http: HttpClient) { }

  createBranchOffice(body) {
    return this.http.post(BananaConstants.urlServer+'api/' + 'thirds/branch/create', body, BananaHeader());
  }

  updateBranchOffice(body){
    return this.http.put(BananaConstants.urlServer + 'api/thirds/branch/update', body, BananaHeader());
  }

  principalBranch(body){
    return this.http.put(BananaConstants.urlServer + 'api/thirds/branch/principal', body, BananaHeader());
  }

  deleteBranch(id, location_id){
    return this.http.delete(BananaConstants.urlServer+'api/thirds/branch/delete/' + id + '/' + location_id, BananaHeader());
  }

  archivedBranch(body){
  return this.http.put(BananaConstants.urlServer+'api/thirds/branch/archived', body, BananaHeader());
  }
}
