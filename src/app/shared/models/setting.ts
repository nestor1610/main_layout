import { HttpClient } from "@angular/common/http";
import { BananaConstants } from "../../core/config/constants";
import { BananaHeader } from "../../core/config/header";
import { notifyManage } from '../utils/notifyUtil'

export class Setting {
  http: HttpClient;
  id: number;
  country_id: number;
  state_id: number;
  city_id: number;
  language_id: number;
  manufacturer_id: number;
  unit_id: number;
  currency_id: number;
  tax_id: number;
  organization_id: number;
  count_registres: number = 100;
  thousands_separator: string = '.';
  decimal_symbol: string = ',';
  decimal_limit: number = 8;
  username_smtp: string = '';
  password_smtp: string = '';
  port_smtp: number = null;
  host_smtp: string = '';
  encryption_smtp: string = '';
  default: number = 0;

  constructor (
    http: HttpClient
  ) {
    let setting: any = JSON.parse( localStorage.getItem('settings_configuration') ) ;
    this.http = http;

    if (setting == null || setting === undefined) {

      this.http.get(BananaConstants.urlServer+'api/settings', BananaHeader()).subscribe(
      (result:any) => {
        if ( result[0] != null && result[0] !== undefined ) {
          this.id = result[0].id;
          this.country_id = result[0].country_id;
          this.state_id = result[0].state_id;
          this.city_id = result[0].city_id;
          this.language_id = result[0].language_id;
          this.manufacturer_id = result[0].manufacturer_id;
          this.unit_id = result[0].unit_id;
          this.currency_id = result[0].currency_id;
          this.tax_id = result[0].tax_id;
          this.organization_id = result[0].organization_id;
          this.thousands_separator = result[0].thousands_separator;
          this.decimal_symbol = result[0].decimal_symbol;
          this.decimal_limit = result[0].decimal_limit;
          this.count_registres = result[0].count_registres;
          this.username_smtp = result[0].username_smtp;
          this.password_smtp = result[0].password_smtp;
          this.port_smtp = result[0].port_smtp;
          this.host_smtp = result[0].host_smtp;
          this.encryption_smtp = result[0].encryption_smtp;
          this.default = result[0].default;
        } else {
          this.valueNull();
        }
        localStorage.setItem('settings_configuration', JSON.stringify( result[0] ) );
      },
      msg => {
        notifyManage(msg);
      });

    } else {

      this.id = ( setting.id );
      this.country_id = ( setting.country_id );
      this.state_id = ( setting.state_id );
      this.city_id = ( setting.city_id );
      this.language_id = ( setting.language_id );
      this.manufacturer_id = ( setting.manufacturer_id );
      this.unit_id = ( setting.unit_id );
      this.currency_id = ( setting.currency_id );
      this.organization_id = ( setting.organization_id );
      this.tax_id = ( setting.tax_id );
      this.thousands_separator = setting.thousands_separator;
      this.decimal_symbol = setting.decimal_symbol;
      this.decimal_limit = setting.decimal_limit;
      this.count_registres = ( setting.count_registres );
      this.username_smtp = setting.username_smtp;
      this.password_smtp = setting.password_smtp;
      this.port_smtp = setting.port_smtp;
      this.host_smtp = setting.host_smtp;
      this.encryption_smtp = setting.encryption_smtp;
      this.default = ( setting.default );

    }
    
  }

  valueNull () {
    this.id = null;
    this.country_id = null;
    this.state_id = null;
    this.city_id = null;
    this.language_id = null;
    this.manufacturer_id = null;
    this.unit_id = null;
    this.organization_id = null;
    this.currency_id = null;
    this.tax_id = null;
    this.thousands_separator = '.';
    this.decimal_symbol = ',';
    this.decimal_limit = 8;
    this.count_registres = 100;
    this.username_smtp = '';
    this.password_smtp = '';
    this.port_smtp = null;
    this.host_smtp = '';
    this.encryption_smtp = '';
    this.default = 0;

    return {
      'id': null,
      'country_id': null,
      'state_id': null,
      'city_id': null,
      'language_id': null,
      'manufacturer_id': null,
      'unit_id': null,
      'currency_id': null,
      'organization_id': null,
      'tax_id': null,
      'thousands_separator': '.',
      'decimal_symbol': ',',
      'decimal_limit': 8,
      'count_registres': 100,
      'username_smtp': '',
      'password_smtp': '',
      'port_smtp': null,
      'host_smtp': '',
      'encryption_smtp': '',
      'default': 0
    }
  }
}

export class SettingSale {
  http: HttpClient;
  id: number;
  private setup = 53;
  price_list_id: number;
  default: number = 0;

  constructor (
    http: HttpClient
  ) {
    const params = {
      setup: this.setup
    };
    let setting: any = JSON.parse( localStorage.getItem('settings_sale') ) ;
    this.http = http;

    if (setting == null || setting === undefined) {

      this.http.get(BananaConstants.urlServer+'api/settings', BananaHeader(params)).subscribe(
      (result:any) => {
        if ( result[0] != null && result[0] !== undefined ) {
          this.id = result[0].id;
          this.price_list_id = result[0].price_list_id;
          this.default = result[0].default;
        } else {
          this.valueNull();
        }
        localStorage.setItem('settings_sale', JSON.stringify( result[0] ) );
      },
      msg => {
        notifyManage(msg);
      });

    } else {

      this.id = ( setting.id );
      this.price_list_id = ( setting.price_list_id );
      this.default = ( setting.default );

    }
    
  }

  valueNull () {
    this.id = null;
    this.price_list_id = null;
    this.default = 0;

    return {
      'id': null,
      'price_list_id': null,
      'default': 0
    }
  }
}