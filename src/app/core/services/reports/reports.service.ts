import { Injectable } from '@angular/core';
import { BananaConstants } from '../../config/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BananaHeader } from '../../config/header';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportsService {

  // constructor(private httpClient: HttpClient) { }
  constructor(public http: HttpClient) { }

  protected formatHeaders (...headers: any[]): {[index: string]: any} {
    let module = window.location.pathname.split('/')[2];

    if (module === undefined) {
      module = 'banana';
    }
    const base = new Headers();
    base.set('authorization', window.location.origin);
    base.append('user', sessionStorage.getItem('user_id'));
    base.append('token', sessionStorage.getItem('user_token'));
    base.append('app', 'BananaCli');
    base.append('organization', sessionStorage.getItem('organization_id') || '0');
    base.append('banana-module', module);
    for (const current of headers) {
      if (typeof current === 'object' && current !== null) {
        if (current instanceof Headers) {
          headers.forEach((value, index) => {
            base.set(index as any, value);
          });
        } else {
          for (const index of Object.keys(current)) {
            base.set(index, current[index]);
          }
        }
      }
    }
    return base;
  }

  protected make (method: string, route: string|string[], data: any, options: any) {

    return new Promise(async (resolve, reject) => {
      let url: string = BananaConstants.urlServer + 'api/';
      if (typeof method !== 'string' || method.length < 1) {
        method = 'get';
      }
      const query = [];

      if (method !== 'get' && method !== 'post') {
        query.push(`_method=${method}`);
        if (method === 'put' || method === 'delete') {
          method = 'post';
        } else {
          method = 'get';
        }
      }

      if (typeof options !== 'object' || options === null) {
        options = { };
      }
      if (options.responseType !== 'blob' && options.responseType !== 'text') {
        options.responseType = 'json';
      }

      if (typeof route === 'string') {
        if (route.length < 0) {
          route = [];
        } else {
          route = [route];
        }
      } else if (!Array.isArray(route)) {
        route = [];
      }
      if (route.length > 0) {
        url += route.join('/');
      }

      const cfg: {[index: string]: any} = {
        method,
        headers: this.formatHeaders(options.headers),
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, same-origin, *omit
      };
      if (method === 'put' || method === 'post') {
        cfg.body = this.formatData(data);
        cfg.body.forEach((value, index) => {
          if (value instanceof File) {
            cfg.headers.delete('Content-Type');
          }
        });
      } else {
        if (typeof data === 'object' && data !== null) {
          for (const index of Object.keys(data)) {
            query.push(`${index}=${data[index]}`);
          }
        }
      }
      if (query.length > 0) {
        url += `?${query.join('&')}`;
      }

      try {
        if (options.responseType === 'json') {
          cfg.headers.set('Accept', 'application/json');
        }

        const r = await fetch(url, cfg);
        let response: any;
        if (options.responseType === 'blob') {
          response = await r.blob();
        } else {
          response = await r.text();
          if (options.responseType !== 'text') {
            try {
              response = JSON.parse(response.trim());
            } catch (error) {
              response = { };
            }
          }
        }
        resolve(response);
        if (r.ok) {
          resolve(response);
        } else {
          reject ({
            ok : r.ok,
            status: r.status,
            statusText: r.statusText,
            data: response
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  formatOptions(options?: any, parameters?: any): {headers: HttpHeaders, params: {[index: string]: any}} {
    // tomamos las variables por defecto de banana
    const base = BananaHeader({}, true);
    // Si se especifiron valores para las opciones
    if (typeof options === 'object' && options !== null) {
      // Si se especificaron otros headers
      if (typeof options.headers === 'object' && options.headers !== null) {
        // Si fue en una instancia de Headers
        if (options.headers instanceof Headers) {
          options.headers.forEach((value: string, key: string) => {
            base.headers = base.headers.set(key, value);
          });
        } else { // Si fue un objeto regular
          for (const key of Object.keys(options.headers)) {
            let value: string;
            if (typeof options.headers[key] === 'function') {
              value = options.headers[key](this);
            } else {
              value = options.headers[key];
            }
            base.headers.set(key, value);
          }
        }
      }

      if (typeof options.params !== 'object' && options.params === null) {
        options.params = Object.create(null);
      }

      if (parameters === 'object' && parameters !== null) {
        for (const index of Object.keys(parameters)) {
          options.params[index] = parameters[index];
        }
      }

      if (typeof options.params === 'object' && options.params !== null) {
        for (const key of Object.keys(options.params)) {
          let value: any;
          if (typeof options.params[key] === 'function') {
            value = options.params[key](this);
          } else {
            value = options.params[key];
          }
          base.params[key] = value;
        }
      }
    }
    return base;
  }

  formatData(...data: any[]): FormData {
    const form = new FormData();
    for (const current of data) {
      if (typeof current === 'object' && current !== null) {
        if (current instanceof FormData) {
          (current as any).forEach((value: any, key: string) => {
            if (value instanceof File) {
              form.set(key, value, value.name);
            } else {
              form.set(key, value);
            }
          });
        } else {
          for (const key of Object.keys(current)) {
            const value = current[key];
            if (value instanceof File) {
              form.set(key, value, value.name);
            } else {
              form.set(key, value);
            }
          }
        }
      }
    }
    return form;
  }

  get(route: string, parameters?: any, options?: any): Promise<any> {
    return this.make('get', route, parameters, options);
  }

  post(route: string, data: any, options?: any): Promise<any> {
    return this.make('post', route, data, options);
  }

  put(route: string, data?: any, options?: any): Promise<any> {
    return this.make('put', route, data, options);
  }

  delete(route: string, parameters?: any, options?: any): Promise<any> {
    return this.make('delete', route, parameters, options);
  }


  // constructor(public http: HttpClient) { }

  reports (params) {
		return this.http.get(BananaConstants.urlServer+'api/reports', BananaHeader(params));
  }
  allTables () {
		return this.http.get(BananaConstants.urlServer+'api/reports/tables', BananaHeader());
  }
  UpdateImge (body) {
    return this.http.post(BananaConstants.urlServer+'api/reports/imageTmp', body, BananaHeader({},true));
  }

  deleteImgTmp (body) {
    return this.http.post(BananaConstants.urlServer+'api/reports/deleteImageTmp', body, BananaHeader({},true));
  }

  validateImageTmp (body) {
    return this.http.post(BananaConstants.urlServer+'api/reports/validateImageTmp', body, BananaHeader({},true));
  }
  imagenList () {
		return this.http.get(BananaConstants.urlServer+'api/reports/imagen/list', BananaHeader());
  }
  getPdf () {
		return this.http.get(BananaConstants.urlServer+'api/reports/getPdf',BananaHeader({},false,true) );
  }
}
