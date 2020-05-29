import { HttpHeaders } from "@angular/common/http";
import { BananaConstants } from "./constants";

/**
 * Funcion que retorna un objecto a usar para cada peticion de HttpClient
 *
 * @export
 * @param {*} [params={}]
 * @param {boolean} [file=false]
 * @param {boolean} [pdf=false]
 * @returns
 */
export function BananaHeader (params = {}, file  = false, pdf = false) {
  let dns: string;
  let module = window.location.pathname.split('/')[2];

  if (module===undefined) module = 'banana';

  if ( sessionStorage.getItem('workspace') == null ) {
    dns = window.location.origin;
  } else {
    dns = BananaConstants.protocol + sessionStorage.getItem('workspace') + '.' + BananaConstants.domain;
  }

  const header = new HttpHeaders().set('authorization', dns)
    .append('user', sessionStorage.getItem('user_id') || '0')
    .append('token', sessionStorage.getItem('user_token') || '0')
    .append('app', 'BananaCli')
    .append('organization', sessionStorage.getItem('organization_id') || '0')
    .append('client', sessionStorage.getItem('third_id') || '0')
    .append('workspace', sessionStorage.getItem('workspace') || '0')
    .append('banana-module', module);

  if(file){
    header.append('enctype', 'multipart/form-data');
  }

  // if ( module != null ) {
  //   header.append('banana-module', module);
  //   console.log('cabecera entrp', module);
  // }

  const options = {
    headers: header,
    params: params
  }

  return options;
}
