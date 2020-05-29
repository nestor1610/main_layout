import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

@Injectable()
export class TypeDocumentsService {

  constructor(public http: HttpClient) { }

  getTypeDocuments () {
    return this.http.get(BananaConstants.urlServer+'api/type-documents', BananaHeader());
  }

  getTypeDocument (id) {
    return this.http.get(BananaConstants.urlServer+'api/type-document/' + id, BananaHeader());
  }

  updateTypeDocumentSetting (body) {
    return this.http.put(BananaConstants.urlServer+'api/type-documents/update', body, BananaHeader());
  }

}
