import { Component, OnInit, Input, ViewChildren, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InternationalizationUtil } from '../../utils/internationalizationUtil';

import * as XLSX from 'xlsx';
import { MigrationService } from '../../../core/services/migrations/migration.service';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { tokenUtil } from '../../utils/tokenUtil';
import { Product, ProductPayroll } from './payrolls/product_payroll';
import { Category } from '../../models/category';
import { TaxonomyOption } from './taxonomy/_taxonomy';
import { PayrollService } from '../../../core/services/migrations/payroll.service';
import { ConfirmAction } from '../../utils/confirm';
// import { count } from 'rxjs/operator/count';
declare var $: any;


@Component({
  selector: 'app-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss']
})
export class MigrationComponent implements OnInit {
  @ViewChildren('unicKeyFilter') inputUniKey: ElementRef;
  @Input() table = 0;
  tables: string[];
  public indextag = 0;
  public data:any;
  public type:number = null;
  public fileReaded:any;
  public headerCount:number;
  public headers:any[] = []
  public guideMigration: any[]=[];
  public loading = false;
  public selectColumns:any[] = [];
  public truncate = false;
  public typeImport = 0
  public step = 0;
  public totalSteps = 5;
  jsonImport:any[]=[];
  unicKeyFilter = null;
  initIn = null;
  endIn = null;
  // payroll : ProductPayroll = new ProductPayroll();
  payroll:any = {};
  taxonomyOptions:TaxonomyOption = new TaxonomyOption();
  public modalUniqueID = '_' + Math.random().toString(36).substr(2, 9);
  public notpayroll = true;
  public payrollList:any[] = [];
  public payrollId = null;
  public payrollname='';



  public lbl: InternationalizationUtil = new InternationalizationUtil(this.http, this.table );

  constructor(public http: HttpClient, private _migrationService: MigrationService, private _PayrollService:PayrollService) { }

  ngOnInit() {
    // this.getColumns()
    this.getAllPayroll();

    this.taxonomyOptions.tax_logic.category=0;

  }

  resetValues(){

  this.tables = [];
  this.indextag = 0;
  this.data=null;
  this.type = null;
  this.fileReaded= {};
  this.headerCount=null;
  this.headers = []
  this.guideMigration=[];
  this.loading = false;
  this.selectColumns = [];
  this.truncate = false;
  this.typeImport = 0
  this.step = 0;
  this.totalSteps = 4;
  this.jsonImport =[];
  this.unicKeyFilter = null;
  this.initIn = null;
  this.endIn = null;
  // payroll : ProductPayroll = new ProductPayroll();
  this.payroll = {};
  // taxonomyOptions:TaxonomyOption = new TaxonomyOption();
   this.notpayroll = true;
   this.payrollList = [];
   this.payrollId = null;
   this.payrollname = '';


  }


  openModal(){
    console.log( $('#migrationModal'+this.modalUniqueID));
    $('#migrationModal'+this.modalUniqueID).show();
    setTimeout(function(){
        $('#migrationModal'+this.modalUniqueID).appendTo('body').modal('show');
        $('.modal-backdrop').remove();
    }, 230);


  }

  closeModal(){
    console.log( $('#migrationModal'+this.modalUniqueID));
    $('#migrationModal'+this.modalUniqueID).hide();
    // setTimeout(function(){
    //     $('#migrationModal'+this.modalUniqueID).appendTo('body').modal('show');
    //     $('.modal-backdrop').remove();
    // }, 230);

    this.resetValues()
  }
  nextStep(){
    this.step += 1;

    let back = false
    if(this.step==1){

      if (this.type==null) {
        back = true;
        $('#type').focus().addClass("shake animated delay-2s");
      }

      if (this.jsonImport.length == 0) {
         $('#file').focus().addClass("shake animated delay-2s");
         back = true;
       }
    }

    if(this.step == 2){

      if (this.payrollId == null) {
        $('#plantilla').focus().addClass("shake animated delay-2s");
        back = true;
      }else{
        this.getPayroll();
      }

    }

    if(this.step==3){
      this.nextStep()
    }

    if(back){
      this.backStep();
    }
  }
  backStep(){
    this.step-= 1;
    if(this.step==3){
      this.step-= 1;
    }
  }

  xlsFile(evt: any) {

    console.log(evt)

      // if( evt.target.files[0].type == "application/vnd.ms-excel" ||  evt.target.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ){


      // }else{

      //   showNotification('Tipo de archivo no valido', 4);

      //   return;

      // }
    this.jsonImport = [];
    this.guideMigration = [];
    this.data = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    // tslint:disable-next-line:curly
    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const jsonData = XLSX.utils.sheet_to_json(ws)

      // for (let i = 0; i < jsonData.length; i++) {
      //     this.jsonImport.push(jsonData[i]);
      // }
      this.jsonImport = jsonData;

      // console.log(this.jsonImport);


      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.generateMigrationGuide();
    };
    reader.readAsBinaryString(target.files[0]);
  }

  convertFile(csv: any) {


    console.log(csv)

    if( csv.target.files[0].type != "application/vnd.ms-excel"){

      showNotification('tipo de archivo no valido', 4);

      return;
    }

    this.jsonImport = [];
    this.guideMigration = [];
    this.data = [];
    this.fileReaded = csv.target.files[0];

    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
    let csv: any = reader.result;

      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(';');
      let lines = [];



      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
          let data = allTextLines[i].split(';');
          if (data.length === headers.length) {
          let tarr = [];
          let oneTime = true
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          if( i != 0 && oneTime ){

            let objeto : any={};

            for (let x = 0; x < headers.length; x++) {

               objeto[headers[x]]=data[x];

             }

            this.jsonImport.push(objeto);
            oneTime = false;

          }

        // log each row to see output

        lines.push(tarr);
        }
    }

    this.data = lines;
    this.generateMigrationGuide();
    }
  }

  generateMigrationGuide(){
    console.log(this.jsonImport[0]);
    console.log(this.data)
    this.headerCount = Object.keys(this.data[0]).length;
    this.headers = this.data[0];
    // console.log("headers",this.headers);
      let obj : any = {};
      let i = 0;
      // console.log( this.data[0])
      this.data[0].forEach((item, index) => {
        obj = {
          columnName: item,
          columnFile:index,
          column : null
        };
        this.guideMigration.push(obj);
        // this.guideMigration[item] = obj;
      });
      // console.log(this.guideMigration);
      // console.log(this.jsonImport);
      // console.log(this.data);
  }

  getColumns() {
    this.loading = true;

    this._migrationService.getColumns(this.table).toPromise()
    .then(
      result => {
        let body : any = result;

        this.selectColumns = body.columns;
        this.selectColumns.unshift({
          column_name: "id",
          description:"ID",
          required: 0,
          selected: 0,
          type_data: "Number",
        });

        this.loading = false;
        this.tables = Array.from(new Set(this.selectColumns.map(({table_name}) => table_name)));

      },
      msg => {
        this.loading = false;
        notifyManage(msg);
      }
    );


  }

  sendMigration(): void {




    if(this.typeImport > 0 && (this.unicKeyFilter === undefined || this.unicKeyFilter == null ) ){

      $('#unicKeyFilter').focus().addClass("shake animated delay-2s");
      console.log($('#unicKeyFilter'));
      return;
    }


    this.loading = true;
    showNotification("Cargando Importacion", 2);
    this.setTaxonomyPayroll()

    let body : any = {};
    body.generalInfo = {
      table: this.table,
      truncate: this.truncate,
      type:this.typeImport,
      taxonomy: (this.hasTaxonomy()) ? this.taxonomyOptions:null,
      initIn:(this.initIn!=null) ? this.initIn - 1:null,
      endIn:(this.endIn!=null)? this.endIn - 1: null
    };
    body.guideMigration = this.toSendGuide();
    body.payroll = this.payroll;


    let countReg =  this.jsonImport.length;
    let init = 0;
    let finish = 19


      this.onlySend(body,(this.initIn!=null) ? this.initIn :null ,(this.endIn!=null)? this.endIn : null)


  }

  setTaxonomyPayroll(){
    let that = this;


    if(this.taxonomyOptions.tax_hierarchical_logic_manual.category == 0){
      return;
    }
    this.payrollTables.forEach((element, index) => {
      // console.log(index);
     if( element != "tablesInfo" && this.payroll.tablesInfo[element]["taxonomyOptions"] != undefined  ) {

      that.payroll.tablesInfo[element]["taxonomyOptions"].forEach((element1, index1) => {

        // tslint:disable-next-line: max-line-length
        that.payroll[element][element1].value = that.taxonomyOptions.tax_hierarchical_logic_manual.list[ that.taxonomyOptions.tax_hierarchical_logic_manual.list.length-1].value;

      });

     }

     });

  }

  onlySend(body, init ,finish){



    body.jsonImport = this.prepareImportSplit(init,finish, this.jsonImport );

    let jsonImportAux = body.jsonImport;

    this.sendRecursive(body,jsonImportAux,1 )

    // if(body.jsonImport.length > 2000){

    //   let jsonImportAux = body.jsonImport;

    //   // const totalChunks = Math.round(body.jsonImport.length / 2000) ;
    //   console.log(totalChunks);
    //   let countChunks = 0

    //     countChunks++;
    //     let chunk = jsonImportAux.splice(0,2000);
    //     body.jsonImport = chunk;
    //     body.chunkNumber = countChunks;

    //     this.callServiceMigration(body);

    //     onlySend(body, init ,finish);

    // }else{
    //   this.callServiceMigration(body)


    // }



  }

  callServiceMigration(body){
    this.loading = true;
    this._migrationService.generateMigration(body).subscribe(
      result => {
        showNotification('Migracion completa', 1);
        body = result;
        this.loading = false;



      },
      msg => {
        if (msg.status == 406) {
          // tokenUtil(this.router);
        }
        this.loading = false;
        notifyManage(msg);
      }
    );


  }

  sendRecursive(body, jsonImportAux, countChunks){

    body.chunkNumber = countChunks;


    if(body.jsonImport.length < 2000){

        this.callServiceMigration(body);

    }else{

      let chunk = jsonImportAux.splice(0,2000);

      body.jsonImport = chunk;
      // body.chunkNumber = countChunks;

      this.loading = true;
      this._migrationService.generateMigration(body).subscribe(
        result => {
          // showNotification('Migracion completa', 1);
          // body = result;

          this.sendRecursive(body, jsonImportAux, countChunks+1)
          this.loading = false;

        },
        msg => {
          if (msg.status == 406) {
            // tokenUtil(this.router);
          }
          this.loading = false;
          notifyManage(msg);
        }
      );

    }

  }


  prepareImportSplit(init, finish, array: Array<any>){
    if(init == null){
      init = 0
    }
    if(finish == null){
      finish = array.length
    }

    return array.slice(init, finish)
  }

  toSendGuide(){
    let result:any = {};
    // console.log("guide mig",this.guideMigration);
    this.guideMigration.forEach((item, index) => {
      result[item.columnName] = item ;
      // result.push=
    });

  console.log(result);


    return  result;
   }
   toSenData(){
      let auxData:any[]=[];
      let auxReg:any ={};
      let is_valid=false;

      for (let i = 1; i < this.data.length; i++) {
        // const element = this.data[i];
        auxReg = {}
        for (let j = 0; j < this.data[i].length; j++) {

          if(this.guideMigration[j].column != null){
            // console.log(this.guideMigration[j])

            auxReg[this.guideMigration[j].columnName]=this.data[i][j]

          }
        }
        auxData.push(auxReg)

      }
      return auxData;

   }

  //  payroll : ProductPayroll = new ProductPayroll();

   simpleDrop: any = null;
   transferData: Object = {id: 1, msg: 'Hello'};
   receivedData: Array<any> = [];

   transferDataSuccess($event: any, element:any) {
      // console.log(this.payroll)
      //  this.receivedData.push($event);
       element.lblvalue ='{{'+ $event.dragData + '}}';
       element.value  =$event.dragData;

       this.changePayroll();
      //  this.receivedData.push(JSON.stringify(this.payroll, null, 4));

   }
   transferCategory($event: any) {
    // console.log(this.payroll)
    //  this.receivedData.push($event);
    //  this.taxonomyOptions.tax_hierarchical_logic_manual.list;
    console.log($event)
    //  element.lblvalue ='{{'+ $event.dragData + '}}';
    //  element.value  =$event.dragData;
    //  this.receivedData.push(JSON.stringify(this.payroll, null, 4));

 }

 setFather(index, element:any){
  element.father_position = index - 1;
 }

  addrowTaxHierarchicalLogicManual(){
    this.taxonomyOptions.tax_hierarchical_logic_manual.list.push( {
      value:"",
      // position:0,
      // father_position:null
    })
  }

  removeRowTaxHierarchicalLogicManual(index){
    this.taxonomyOptions.tax_hierarchical_logic_manual.list.splice(index,1);
  }

   payrollTables:any[] = [];
   payrollMap:any[] = []
   preparePayrolltTables(){

    this.payrollTables = Object.keys(this.payroll);

    console.log(this.payrollTables)

    this.payrollTables.forEach(element => {

     this.payrollMap[element] = Object.keys(this.payroll[element])

    });
    // this.headers = Object.keys(this.jsonImport[0]);
    console.log(this.payrollMap)



   }

   selectUnicKey($event: any){
     this.unicKeyFilter = $event.dragData;

     this.payrollTables.forEach(element => {
       console.log(this.payroll.tablesInfo[element])
       if (this.payroll.tablesInfo[element].id == this.table) {

        this.payroll.tablesInfo[element]["key"] = this.unicKeyFilter;
        return;
       }

     });
    //  this.payroll.tablesInfo["productos"]["key"] = this.unicKeyFilter;

   }

   hasTaxonomy(){

    let result = false
    // console.log(this.payrollMap,this.payrollTables )
      this.payrollTables.forEach((element, index) => {
        // console.log(index);

       // tslint:disable-next-line: max-line-length
       if( element!="tablesInfo" && this.payroll.tablesInfo[element]["taxonomyOptions"] != undefined && this.payroll.tablesInfo[element]["taxonomyOptions"] != false ) {

        result = true;
          return;
       }

       });

       return result;

   }

   taxonomydnd($event:any,element:any ){

    console.log(event)
      //  this.receivedData.push($event);

       element.value  = $event.dragData;



   }


  getAllPayroll(){
    this.loading = true;
    this._PayrollService.getAllPayroll(this.table).subscribe(
      resp=>{

        let result :any =resp

        if(result.length > 0){
          // this.notpayroll = true;
        }else{

          this.notpayroll = false;


        }

        this.payrollList = result;

        console.log(this.payrollList);

        this.loading = false;
      },
      error=>{
        this.notpayroll = true;
        this.loading = false;
      }
    )

  }

  getPayroll(){
    this.loading = true;
    this._PayrollService.getPayroll(this.payrollId).subscribe(
      result=>{

          console.log(result  )
          this.payroll = result

          this.preparePayrolltTables();
          this.loading = false;

      },
      error=>{
        this.loading = false;
      }
    )

  }




  public editPayroll = false;
  changePayroll(){

    this. editPayroll= true;

  }

  savePayroll(){
    this.loading=true;
    let body = {payroll:this.payroll}
    this._PayrollService.updatePayroll(body).subscribe(
      result => {
        console.log(result)
        this.loading=false;
      },
      error=>{

      }
    )
  }

  deletePayroll(){

    this.loading = true;
    this._PayrollService.deletePayroll(this.payrollId, this.table).subscribe(
      resp => {
        let result :any =resp
        console.log(result)
        this.loading = false;
        this.payrollList = result;
        this.payrollId = null;
      },
      error=>{
        this.loading = false;
      }
    )
  }


  scriptsPayroll(){

    this.loading = true;
    if(this.payrollname == ''){
      showNotification('nombre invalido', 4);
      this.loading = false;
    }else{

      this._PayrollService.scriptsPayroll(this.table, this.payrollname).subscribe(
        resp => {
          let result :any = resp;
          console.log(result);
          this.payrollId = result.idpayroll;
          this.getAllPayroll();
          this.loading = false;

        },
        error=>{
          this.loading = false;
        }
      )

    }

  }

  milog(){
    console.log(this.payrollId)
  }

  updatePayroll(){
    ConfirmAction('Desea guardar Plantilla?', 3).then( (result) => {
      if(result.value){

        this.savePayroll()
      }
      this.sendMigration();
    });
  }



}
