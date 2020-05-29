import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../../../core/services/locations/location.service';
import { Localization } from '../../models/localization';
import { ControlAccess } from '../../utils/controlAccess';
import { InternationalizationUtil } from '../../utils/internationalizationUtil';
import { notifyManage } from '../../utils/notifyUtil';
import { tokenUtil } from '../../utils/tokenUtil';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit, OnChanges {
  @Input() table: number;
  @Input() type_view: number = 0;
  @Input() access: ControlAccess;
  loading = false;
  localizationTitle: string = 'Localizacion';
  @Input() localization: Localization;
  @Input() read_only: boolean;
  countries: any = [];
  states: any = [];
  cities: any = [];
  //@Output() address = new EventEmitter<any>();
  //@Output() location_selected = new EventEmitter<any>();
  // create_location: boolean = false;
  searching: boolean = false;
  search: string = '';
  locations_search: Array<any> = [];
  body: any;
  lbl: InternationalizationUtil;
  @Input() properties_id: any = {};

  constructor(
    public http: HttpClient,
    public router: Router,
    private location_service: LocationService
  ) { }

  ngOnInit() {
    this.read_only = false;
    this.getCountries();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lbl = new InternationalizationUtil(this.http, this.table);
    this.lbl.moduleVerificTags();
    // for (let propName in changes) {
    // 	let chng = changes[propName];
    // 	let cur  = JSON.stringify(chng.currentValue);
    // 	let prev = JSON.stringify(chng.previousValue);
    // 	console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    // }
    //setTimeout(() => { this.fullAddress(); }, 0);
    this.getStates(this.localization.country_id, false);
    this.getCities(this.localization.state_id, false);
    /* if ( changes.localization.previousValue !== undefined ) {
      if ( changes.localization.previousValue.country_id != changes.localization.currentValue.country_id )
        this.getStates( this.localization.country_id, false );
      if ( changes.localization.previousValue.state_id != changes.localization.currentValue.state_id )
        this.getCities( this.localization.state_id, false );
    } */
  }

  getIdColumnByProperty(property: string) {
    // Retorna el valor de la propiedad o -1
    return this.properties_id.hasOwnProperty(property) ? this.properties_id[property] : -1;
  }

  deselectOption(object, property_name) {
    let me = object;

    setTimeout(function () {
      me[property_name] = null;
    }, 0);
  }

  getCountries() {
    this.loading = true;
    this.location_service.getCountries().toPromise().then(
      result => {
        this.loading = false;
        let body: any = result;
        this.countries = body.countries;
      },
      msg => {
        if (msg.status == 406) {
          tokenUtil(this.router);
        }
        this.loading = false
        notifyManage(msg);
      }
    );
  }

  getStates(country_id, user = true) {
    if (user) {
      this.localization.state_id = null;
      this.localization.city_id = null;
    }
    this.loading = true;
    this.states = [];
    this.cities = [];

    if (country_id != null)
      this.location_service.getStates(country_id).toPromise().then(
        result => {
          this.loading = false;
          let body: any = result;
          this.states = body.states;
        },
        msg => {
          if (msg.status == 406) {
            tokenUtil(this.router);
          }
          this.loading = false;
          notifyManage(msg);
        }
      );
  }

  getCities(state_id, user = true) {
    if (user) this.localization.city_id = null;
    this.loading = true;
    this.cities = [];

    if (state_id != null)
      this.location_service.getCities(state_id).toPromise().then(
        result => {
          this.loading = false;
          let body: any = result;
          this.cities = body.cities;
        },
        msg => {
          if (msg.status == 406) {
            tokenUtil(this.router);
          }
          this.loading = false;
          notifyManage(msg);
        }
      );
  }

}
