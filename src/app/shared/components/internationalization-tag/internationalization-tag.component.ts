import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { BananaConstants } from '../../../core/config/constants';
import { tokenUtil } from '../../utils/tokenUtil';
import { BananaHeader } from '../../../core/config/header';
import { InternationalizationUtil } from '../../utils/internationalizationUtil';
import { clearStorage } from '../../utils/clearStorage';

declare var $: any;

@Component({
  selector: 'app-internationalization-tag',
  templateUrl: './internationalization-tag.component.html',
  styleUrls: ['./internationalization-tag.component.scss']
})
export class InternationalizationTagComponent implements OnInit {
  modalUniqueID = '_' + Math.random().toString(36).substr(2, 9);
  editable=false;
  @Input() table;
  @Input() auxTables:any[] = [];
  @Input() tableName = 'Current Module';
  auxTable;
  btnloading = false;
  loadingCrud = false;
  loading = false;
  tag : any = {
    tag:'',
  };
  all_tags : any[] = [];
  titleCrud = '';
  lenguages:any[];
  childTags:any[] = [];
  childTagsGuia:any[] = [];
  lbl: InternationalizationUtil;

  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    // console.log('tabla de interna', this.table);
    this.lbl = new InternationalizationUtil(this.http, this.table );
    this.auxTable = this.table;
    this.auxTables.push({id:0,text:'Global'})
    this.auxTables.push({id:this.auxTable,text:this.tableName})
  }

  getLenguages(){
    this.btnloading = true;
    this.childTagsGuia = [];
    let body: any = {};
    this.http.get(BananaConstants.urlServer + 'api/internationalization/getElements', BananaHeader()).toPromise().then(
           result => {
            // console.log(result)
            body =  result;
            this.lenguages = body.lenguages;
            // this.childTags = this.lenguages;
            this.lenguages.forEach(element => {
              this.childTagsGuia.push({
                id:-1,
                id_lang : element.id,
                lenguage : element.description

              });

            });
            this.childTags = Object.assign([], this.childTagsGuia);
            // console.log(this.childTags)
            this.btnloading = false;
             
           },
           msg => {
             if (msg.status == 406) {
               tokenUtil(this.router);
             }
             this.btnloading = false;
              
             notifyManage(msg);
         }
     );
  }

  getElements(): void {
    // this.table = sessionStorage.getItem('table');
    let body: any = {};
    this.loading = true;
    showNotification('Obteniendo elementos', 2);

    this.http.get(BananaConstants.urlServer + 'api/internationalization/getAllTag/' +
     this.table, BananaHeader()).toPromise().then(
            result => {
              // console.log(result)
              body =  result;
              this.all_tags = body.tags;
              this.loading = false;
               $('.modal-backdrop').remove();
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.loading = false;
               $('.modal-backdrop').remove();
              notifyManage(msg);
          }
      );
  }

  getTag(idTag): void {
    // this.table = sessionStorage.getItem('table');
    this.loadingCrud = true;
    let body: any = {};
    // console.log('idTag',idTag);
    const params:any = {
      idTag: idTag,
      idTable : this.table
    }
    showNotification('Obteniendo Tag', 2);

    this.http.get(BananaConstants.urlServer + 'api/internationalization/getTag' , BananaHeader(params)).toPromise().then(
            result => {

              body =  result;
              const allTagschild = body.tag;
               let childTagsAux = [];
               $('.modal-backdrop').remove();

               allTagschild.forEach(element => {

                if(element.id == idTag ){

                  this.tag = element;
                  this.openLanguageTagCrudModal();

                }

               });



               for (let i = 0; i < this.lenguages.length; i++) {
                 let is_add = false;

                for (let j = 0; j < allTagschild.length; j++) {
                  if (this.lenguages[i].id == allTagschild[j].id_lang ){
                    childTagsAux.push(allTagschild[j]);
                    is_add = true;
                    break;
                  }
                }

                if(!is_add){
                  childTagsAux.push({
                    id:-1,
                    id_lang : this.lenguages[i].id,
                    lenguage : this.lenguages[i].description
                  });
                }

              }


               this.childTags  = childTagsAux;
               this.loadingCrud = false;
              //  console.log(childTagsAux);


            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }

              this.loadingCrud = false;
               $('.modal-backdrop').remove();
              notifyManage(msg);
          }
      );
  }


  cleanForm(only_name = true){
    let me = this;

    this.tag={
      name:''
    };
    // if (!only_name) this.childTags = [];
    $('#tagCrud'+me.modalUniqueID).modal('hide');
  }
  openLanguageTagListModal(){
    let me = this;

    this.getLenguages();
    this.loading = true;
    this.getElements();

    $('#LanguageTagList'+me.modalUniqueID).appendTo('body').modal('show');
    /* setTimeout(function(){
    }, 230); */

  }
  openLanguageTagCrudModal(){
    let me = this;

    $('#tagCrud'+me.modalUniqueID).appendTo('body').modal('show');
    $('.modal-backdrop').remove();
    /* setTimeout(function(){
    }, 230); */

  }

  goToEdit(idtag){
    this.titleCrud = 'edit tag';
    this.editable = true;
    this.childTags = Object.assign({}, this.childTagsGuia);
    // console.log(this.childTagsGuia);
    this.getTag(idtag);
    // console.log(this.tag)

  }

  delete(tag, index){

    // console.log(tag);
    this.loading = true;
    
    this.http.delete(BananaConstants.urlServer+'api/internationalization/delete/'+this.table+'/'+tag.id, BananaHeader()).toPromise().then(
            result => {;
              showNotification('Eliminado con exito', 1);
              localStorage.removeItem('tag_'+this.table+'_'+tag.key);
              this.all_tags.splice(index,1);
              this.loading = false;
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
  update(){

    this.loadingCrud = true;
    // console.log(this.prepareTagList())
    if(this.prepareTagList()){

      showNotification("actualizando campo", 2);
      let body : any;
      body = {
        tags : this.childTags,
        parentTagID : this.tag.id
      };

      // console.log( JSON.stringify( body));
      this.http.put(BananaConstants.urlServer+'api/internationalization/UpdateLanguageTag', body, BananaHeader()).toPromise().then(
              result => {
                      // console.log('result.status', result);
                      const respBody :any = result;
                      showNotification('guardado con exito', 1);
                      this.loadingCrud = false;
                      this.cleanForm();
                      this.all_tags = respBody.tags;
                      clearStorage();
                      this.lbl.moduleVerificTags(true);
              },
              msg => {
                if (msg.status == 406) {
                  tokenUtil(this.router);
                }
                this.loadingCrud = false;
                notifyManage(msg);
            }
        );

    }else{
      showNotification('Traduccion Incompleta', 2);
      this.loadingCrud = false;

    }

  }

  prepareTagList(){
    let value = true;
    this.childTags.forEach(element => {
      element.id_table = this.table;
      element.tag = this.tag.tag;
      if(element.description === undefined ){
        value = false;
      }
    });
    // console.log(this.childTags);
    return value;
  }

  create(): void {

    this.loadingCrud = true;
    showNotification("Creando campo", 2);

    this.prepareTagList();
    let body = {

      allTags : this.childTags,
      tag : this.tag.tag,
      idTable : this.table,
      idLang : 1

    };

    // console.log('body');

    // console.log(body);
    this.http.post(BananaConstants.urlServer+'api/internationalization/insertLanguageTag', body, BananaHeader()).toPromise().then(
            result => {
                    // console.log('result.status', result);
                    showNotification('guardado con exito', 1);
                    this.loadingCrud = false;
                    this.cleanForm();
                    const respBody: any = result;
                    this.all_tags = respBody.tags;
                    clearStorage();
                    this.lbl.moduleVerificTags(true);
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.loadingCrud = false;
              notifyManage(msg);
          }
      );
  }

  goToCreate(){
    this.titleCrud = 'Agregar tag'
    this.cleanForm(false);
    this.editable = false;
    this.openLanguageTagCrudModal();
  }

}
