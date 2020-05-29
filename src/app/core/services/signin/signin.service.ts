import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';

import * as io from 'socket.io-client';

import { Md5 } from 'ts-md5';
import { Observable } from 'rxjs';


@Injectable()
export class SigninService {

  is_log = false;
  token = "";
  private socket;
  constructor(public http: HttpClient) {

    if (sessionStorage.getItem('window_token') == null) {

      let md5 = new Md5();

      md5.appendStr('somestring')
        .appendAsciiStr(Date());
      let val = md5.end();
      this.token = val.toString()
      sessionStorage.setItem('window_token', this.token);
      //
    } else {
      this.token = sessionStorage.getItem('window_token');
    }

    this.socket = io(BananaConstants.WsServer, { query: "private=" + this.token });

  }

  public getMessages = () => {
    console.log('getMessages: laravel_' + this.token)
    return Observable.create((observer) => {

      //private channel windows
      this.socket.on('laravel_' + this.token, (message) => {
        observer.next(message);
      });

      this.socket.on('connect', () => {
        console.log(this.socket.id); // 'G5p5...'
      });

      this.socket.on('error', () => {
        console.log(this.socket.id); // 'G5p5...'
      });


    });
  }

  validateTokenEmail(token) {
    return this.http.post(BananaConstants.urlServer + 'api/signin/validateEmailToken', { token: token });
  }

  validateEmail(body) {

    return this.http.post(BananaConstants.urlServer + 'api/signin/validateEmail', body);
  }

  testWs() {
    const body = {
      channelNotification: this.token
    }
    return this.http.post(BananaConstants.urlServer + 'api/signin/testWS', body);
  }


  validateCif(cif) {

    let body = {
      cif: cif
    }

    return this.http.post(BananaConstants.urlServer + 'api/signin/searchCif', body);
  }

  searchDnsAvailable(dns) {
    let body = {
      dns: dns
    }
    return this.http.post(BananaConstants.urlServer + 'api/signin/searchDnsAvailable', body);
  }

  generateBD(prospect) {
    let body: any;
    body = prospect
    body.channelNotification = this.token;
    return this.http.post(BananaConstants.urlServer + 'api/signin/generatebd', prospect);
  }

  testConection (conection) {
    return this.http.get(BananaConstants.urlServer + 'api/database/testconection', BananaHeader(conection));
  }

}
