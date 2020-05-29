import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class ContactsService {

  constructor(public http: HttpClient) { }

  createContact(body, url_create){
    return this.http.post(BananaConstants.urlServer+'api/' + url_create, body, BananaHeader());
  }

  updateContact(body, url_update){
    return this.http.put(BananaConstants.urlServer+'api/' + url_update, body, BananaHeader());
  }

  deleteContact (id, contact, url_delete){
    return this.http.delete(BananaConstants.urlServer+'api/' + url_delete + id + '/' + contact.id, BananaHeader());
  }

  archivedContact(body){
    return this.http.put(BananaConstants.urlServer+'api/contacts/archived', body, BananaHeader());
  }

}
