import { BananaConstants } from '../../core/config/constants';
import { notifyManage } from './notifyUtil';
import { BananaHeader } from '../../core/config/header';
import { Setting } from '../models/setting';
import { isNull } from 'util';

export class InternationalizationUtil {
  public table ;
  public http :any;
  public hashTable = 'with_out_hash';

  // constructor(public http: HttpClient){
  //   this.table = sessionStorage.getItem('table_id');
  // }

  constructor(http, table){
    this.http = http;
    this.table = table;
  }



  defineModule(islocal){
    let result;
    if(islocal){
      switch (this.table) {
        case '17':
        result= 'tercero';
          break;
        case '5':
          result= 'paises';
            break;
      }

    }else{
      result = 'global';
    }
    return result;
  }

  tags(tag: string, isGlobal = false, forceTable = null) {
    let table = this.table;

    if(forceTable != null){
      table = forceTable;
    }

    if(isGlobal){ table = 0 }
    const key = 'tag_' +table+'_'+ tag;
    const default_value = tag.replace(/_/g, ' ');
    //  console.log(key);
    const cadena = localStorage.getItem(key) || /* default_value */ '"'+ key +'"';

    return cadena[0].toUpperCase() + cadena.substring(1) ;
  }

  moduleVerificTags(force = false){

    // let languageHashes = JSON.parse(localStorage.getItem("tag_hashes"))

    // console.log(languageHashes)

    // if(languageHashes[this.table] != null){

    // }else{
    //   this.getTags(this.table, localStorage.getItem(this.table +'_Tags'));
    //   languageHashes[this.table]=this.hashTable
    // }

    // this.getTags(0, localStorage.getItem(0 +'_Tags'));

    this.callMethodsVerificDatesAndHashs(0);
    this.callMethodsVerificDatesAndHashs(this.table)

    // let hashobj = JSON.parse(localStorage.getItem(0 +'_Tags'));
    // this.getTags(0, hashobj.hash);

  }

  callMethodsVerificDatesAndHashs(table){
    let dateCompare = null;
    // let hash = null

    let hashobj = JSON.parse(localStorage.getItem(table + '_Tags'));

    if ( isNull(hashobj) || hashobj.hash === 'with_out_hash'){

      this.getTags(table);

    } else {
      // Suma de 45 minutos en milisegundos para la comparacion
      dateCompare = hashobj.date + (45 * 60000);
      if (dateCompare < Date.now()) {
        this.getTags(table , hashobj.hash );
      }

    }


  }

  getTags(idTable, hash = 'with_out_hash'){
    let setting: Setting = new Setting(this.http);
    const params = {
      idLang : setting.language_id || 1,
      idTable : idTable,
      hash: hash
    };

    this.http.get(BananaConstants.urlServer + 'api/internationalization/getAllTagSystem', BananaHeader(params)).subscribe(
      (result: any) => {
        let tags = result.tags;
        let obj = {
          hash: result.hash,
          date: Date.now(),
          id: this.table
        };
        this.hashTable = result.hash;
        localStorage.setItem(idTable + '_Tags', JSON.stringify(obj));

        if (idTable === undefined) {
          return;
        }

        tags.forEach( element => { this.saveInLocal('tag_' + idTable + '_' + element.key, element.value); });

        $('.modal-backdrop').remove();

      }, msg => {
        $('.modal-backdrop').remove();
        notifyManage(msg);
    });
  }


  saveInLocal(key, val): void {

    localStorage.setItem(key, val);

   }

  setCurrentModule(module, value){
    localStorage.setItem(module +'Tags', value);
  }

  getAllTags(){
    // JSON.parse( localStorage.getItem('settings_configuration') ) ;
    // let languageHashes:any[] = []
    // this.http.get(BananaConstants.urlServer + 'api/internationalization/getAllhash',
    // BananaHeader()).suscribe(
    //        result => {
    //         let body =  result;
    //         // body.hashes.forEach(element => {
    //         //   languageHashes[element.table_id]['hash'] = element.hash;
    //         //   languageHashes[element.table_id]['date'] = Date.now();
    //         // });

    //         this.saveInLocal('tag_hashes',JSON.stringify(languageHashes));

    //        },
    //        msg => {

    //           $('.modal-backdrop').remove();
    //          notifyManage(msg);
    //  });

  }

}
