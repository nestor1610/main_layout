import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';
import { forkJoin } from 'rxjs';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class UsersService {

  constructor(
    public http: HttpClient,
    private organization_service: OrganizationsService
  ) { }

  getUsers(params) {
    return this.http.get(BananaConstants.urlServer + 'api/users', BananaHeader(params));
  }

  search(filter) {
    return this.http.get(BananaConstants.urlServer + 'api/users/filter', BananaHeader(filter));
  }

  getElements() {
    let elements = this.http.get(BananaConstants.urlServer + 'api/users/elements', BananaHeader());
    let organizations = this.organization_service.organizationList();
    return forkJoin([elements, organizations]);
  }

  getPermits(params) {
    return this.http.get(BananaConstants.urlServer + 'api/users/getPermits', BananaHeader(params));
  }

  getUser(email) {
    return this.http.get(BananaConstants.urlServer + 'api/user/' + email, BananaHeader());
  }

  findUserInThirdContacts(email, contact_id) {
    return this.http.get(BananaConstants.urlServer + 'api/users/third_contact/' + email + '/' + contact_id, BananaHeader());
  }

  createUser(body) {
    return this.http.post(BananaConstants.urlServer + 'api/users/create', body, BananaHeader());
  }

  updateUser(body) {
    return this.http.put(BananaConstants.urlServer + 'api/users/update', body, BananaHeader());
  }

  updateProfile(body) {
    return this.http.put(BananaConstants.urlServer + 'api/users/change/password', body, BananaHeader());
  }

  updateEmailCredentials(body) {
    return this.http.put(BananaConstants.urlServer + 'api/users/email/credentials', body, BananaHeader());
  }

  archivedUser(body) {
    return this.http.put(BananaConstants.urlServer + 'api/users/archived', body, BananaHeader());
  }

  deleteUser(id) {
    return this.http.delete(BananaConstants.urlServer + 'api/users/delete/' + id, BananaHeader());
  }

  sendPermitsUser(body) {
    return this.http.post(BananaConstants.urlServer + 'api/users/permits/save', body, BananaHeader());
  }

  UpdateImge(body) {
    return this.http.post(BananaConstants.urlServer + 'api/users/save/image', body, BananaHeader({}, true));
  }

  resetPassword(email) {
    return this.http.get(BananaConstants.urlServer + 'api/users/reset/password/' + email, BananaHeader());
  }

  verifySession() {
    return this.http.get(BananaConstants.urlServer + 'api/users/verify/session', BananaHeader());
  }

  verifyToken(token) {
    return this.http.get(BananaConstants.urlServer + 'api/users/verify/token/' + token, BananaHeader());
  }

}
