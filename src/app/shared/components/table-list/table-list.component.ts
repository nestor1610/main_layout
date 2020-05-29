import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { BananaConstants } from '../../../core/config/constants';
import { EventLaunchService } from '../../../core/services/event-launch/event-launch.service';
import { GenerateFormService } from '../../../core/services/generate-form/generate-form.service';
import { TableListSettingsService } from '../../../core/services/table-list-settings/table-list-settings.service';
import { ColumnDataTable, DataTable } from '../../models/form';
import { Setting } from '../../models/setting';
import { changeObject } from '../../utils/changeObject';
import { cloneObject } from '../../utils/cloneObject';
import { ConfirmAction } from '../../utils/confirm';
import { ControlAccess } from '../../utils/controlAccess';
import { InternationalizationUtil } from '../../utils/internationalizationUtil';
import { notifyManage } from '../../utils/notifyUtil';
import { getValuesOfSelect } from '../../utils/select2Util';
import { isUrl } from '../../utils/string';
import { tokenUtil } from '../../utils/tokenUtil';

declare var $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, OnChanges {
  @ViewChildren('InputInList') row_template: QueryList<any>;
  @Input() withButtonEye = false;
  @Input() InternationalizationEnable = true;
  @Input() col_option = true;
  @Input() kanban = false;
  @Input() simple = false;
  @Input() defaultImg = '';
  @Input() access: ControlAccess = new ControlAccess(this.http);
  @Input() editable = false;
  @Input() table;
  @Input() readBtnDisabled = false;
  @Input() columnHeaders: Array<ColumnDataTable> = [];
  data_table: DataTable = new DataTable();
  @Input() editIndex = 'id';
  @Input() registres: Array<any> = [];
  @Input() multipleTabs = true;
  @Input() setting: Setting = new Setting(this.http);
  // tiene migracion
  @Input() why_migration = false;
  @Input() with_archived = true;
  contextId = 0;
  public rows: Array<any> = [];
  public clone_rows: Array<any> = [];
  public imageProperty = null;
  modalUniqueID = '_' + Math.random().toString(36).substr(2, 9);
  // @ViewChild('tableListContextMenu' + this.table ) public tableListContextMenu: ContextMenuComponent;

  @Output() listControl = new EventEmitter<any>();
  @Output() endRegistres = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() archivateEvent = new EventEmitter<any>();
  @Output() viewEvent = new EventEmitter<any>();

  // editableEvents
  @Output() updateEditableEvent = new EventEmitter<any>();
  @Output() editingEditableEvent = new EventEmitter<any>();
  @Output() deleteEditableEvent = new EventEmitter<any>();
  @Output() newEditableEvent = new EventEmitter<any>();
  @Output() newWindowEvent = new EventEmitter<any>();
  newRowAct = false;

  public lbl: InternationalizationUtil;
  public loading = false;

  public totalReg = 0;
  public totalPages = 1;
  public paginateOptions = [{ id: 10, text: 10 }, { id: 20, text: 20 }, { id: 50, text: 50 }];
  @Input() rowPerPag: any = 10;
  @Input() page = 1;
  not_paginate = false;
  public init = 0;
  public fin = this.rowPerPag;
  public config: PaginationInstance = {
    itemsPerPage: this.rowPerPag,
    currentPage: 1,
    totalItems: this.totalReg

  };
  image_url: string = BananaConstants.urlServer + 'storage/img/';
  private type_inputs = {
    id: 'id',
    only_view: 'only_view',
    boolean: 'boolean',
    date: 'date',
    barcode: 'barcode',
    image: 'image',
    color: 'color',
    number_format: 'number_format',
    text: 'text'
  };

  constructor(
    public http: HttpClient,
    public router: Router,
    private _tableListSettingsService: TableListSettingsService,
    private _generate_form_service: GenerateFormService,
    private _EventLaunchService: EventLaunchService
  ) { }

  ngOnInit() {
    this.addAditionalProp();
    this.getElementsTableList();
    /* if (this.columnHeaders === undefined) {
      this.columnHeaders = [];

    } else {
      this.addAditionalProp();
      this.getHeadersSetting();
    } */

    this.lbl = new InternationalizationUtil(this.http, this.table);
    this.lbl.moduleVerificTags();
    // console.log(this.access.columnsTable)
    // this.getControls();
  }

  ngOnChanges() {
    if (this.registres.length == 0) this.rows = [];
    this.refreshTotalRegisters();
    this.getControls();
    // this.addAditionalProp();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnHeaders, event.previousIndex, event.currentIndex);
  }

  refreshTotalRegisters() {
    this.totalReg = this.registres.length;
  }

  changeRowPerPage() {
    this.refreshTotalRegisters();
    this.getControls();
    // this.addAditionalProp();
  }

  getControls(page = 1) {
    this.refreshTotalRegisters();
    if (this.totalReg > 0) {
      this.totalPages = Math.round((this.totalReg) / this.rowPerPag);

      if (!this.not_paginate)
        this.goToPage(page);

      this.not_paginate = false;

      this.addEditable();
    }
  }

  goToPage(page) {

    this.init = (page == 1) ? 0 : ((page - 1) * parseInt(this.rowPerPag));

    this.fin = (page == 1) ? parseInt(this.rowPerPag) : (this.init + parseInt(this.rowPerPag));

    if (this.fin > this.totalReg) {
      this.fin = this.totalReg
    }


    this.rows = this.registres.slice(this.init, this.fin);
    this.clone_rows = cloneObject(this.rows);
    // console.log('clon de registros en pantalla', this.clone_rows);

    this.page = page;

    // console.log('inicio', this.init, 'fin', this.fin, 'pagina', this.page);

    if (this.fin == this.totalReg) {
      this.not_paginate = true;
      this.endRegistres.emit({
        init: this.init, end: this.fin, page: this.page, total: this.totalReg
      });
    }
  }

  refreshConfig() {
    this.config.currentPage = 1
    this.config.itemsPerPage = this.rowPerPag

  }

  changeRowPerPages() {
    // this.rowPerPag = {id:this.rowPerPag}
    this.getControls()
    this.refreshConfig()
    this.goToPage(1);
  }



  orderBy(columnHeader: any) {
    const propertyName = columnHeader.key;

    if (columnHeader.icon == '' || columnHeader.icon == 'fa fa-sort-down') {
      // console.
      this.addIcon(columnHeader, 'ASC');
      this.ordASC(propertyName);
    } else {
      this.ordDESC(propertyName);
      this.addIcon(columnHeader, 'DESC');
    }


    this.init = 0;
    this.fin = this.rowPerPag;
    this.goToPage(1);
  }

  ordASC(propertyName) {
    this.registres.sort(function (a, b) {
      if (a[propertyName] === null) {
        return -1;
      } else if (b[propertyName] === null) {
        return 1;
      }

      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    this.rows.sort(function (a, b) {

      if (a[propertyName] === null) {
        return -1;
      } else if (b[propertyName] === null) {
        return 1;
      }

      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

  }

  ordDESC(propertyName) {
    this.registres.sort(function (a, b) {
      if (a[propertyName] === null) {
        return 1;
      } else if (b[propertyName] === null) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return -1;
      }
      if (a[propertyName] < b[propertyName]) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    this.rows.sort(function (a, b) {

      if (a[propertyName] === null) {
        return 1;
      } else if (b[propertyName] === null) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return -1;
      }
      if (a[propertyName] < b[propertyName]) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

  }

  archivate(obj, type) {
    this.archivateEvent.emit({ entity: obj, type: type });
  }


  update(id) {
    this.updateEvent.emit(id);
  }

  getValue(row: any, column) {

    return row[column.key];
  }

  openModal() {
    $('#columnsConfModal' + this.modalUniqueID).appendTo('body').modal({ backdrop: 'static', keyboard: false, show: true });
  }

  addAditionalProp() {

    for (let index = 0; index < this.columnHeaders.length; index++) {
      this.columnHeaders[index]['icon'] = '';
      if (this.columnHeaders[index]['width'] === undefined || this.columnHeaders[index]['width'] == '') {
        this.columnHeaders[index]['width'] = null;
      }

      if (this.columnHeaders[index]['type_column'] == 'image') {
        this.imageProperty = this.columnHeaders[index].key;
      }
    }
  }

  addEditable() {
    for (let index = 0; index < this.registres.length; index++) {
      this.registres[index]['editable'] = false;
    }
  }

  changeRowBy(id: number, row: any) {
    for (let index = 0; index < this.registres.length; index++) {
      if (this.registres[index].id == id) {
        this.registres[index] = row;
      }
    }
  }


  addIcon(columnHeader, type) {

    for (let i = 0; i < this.columnHeaders.length; i++) {
      if (this.columnHeaders[i].key == columnHeader.key) {

        if (type == 'ASC') {
          this.columnHeaders[i]['icon'] = 'fa fa-sort-up';
        } else if (type == 'DESC') {
          this.columnHeaders[i]['icon'] = 'fa fa-sort-down';
        }
      } else {
        this.columnHeaders[i]['icon'] = '';
      }

    }

  }

  focusIn(column_index) {
    let me = this;
    setTimeout(
      function () {
        me.row_template.toArray()[column_index].nativeElement.select();
      },
      0
    );
  }

  editRow(row, index) {
    // Si el registro no tiene la propiedad ID, no se editara
    if (!row.hasOwnProperty('id')) return;
    // Si ya esta en estado de edicion, retorna
    if (row.editable) return;

    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].editable = false;
      this.clone_rows[i].editable = false;
    }

    // Descarta forzosamente el renglon en edicion
    this.discardEditForce(index);

    row.editable = true;
    this.clone_rows[index].editable = true;

    // this.clone_row = cloneObject(row);
    this.editingEditableEvent.emit(row);

    this.focusIn(0);
  }

  discardEdit(row, index) {
    let evaluate = [
      {
        current: this.clone_rows[index],
        changed: row
      }
    ];

    // console.log('evaluando', evaluate);

    if (changeObject(evaluate)) {
      ConfirmAction('Desea descartar los cambios?', 3).then((result) => {
        if (result.value) {

          if (!this.newRowAct) {
            this.clone_rows[index].editable = false;
            this.rows[index] = cloneObject(this.clone_rows[index]);
            // this.addEditable( this.clone_row.id, cloneObject(this.clone_row) );
            this.changeRowBy(this.clone_rows[index].id, cloneObject(this.clone_rows[index]));
          }
          if (this.newRowAct) {
            this.rows.splice(0, 1);
            this.clone_rows.splice(0, 1);
            this.newRowAct = false;
          }

        }
      });
    } else {

      if (!this.newRowAct) {
        this.clone_rows[index].editable = false;
        this.rows[index] = cloneObject(this.clone_rows[index]);
        this.addEditable();
      }
      if (this.newRowAct) {
        this.rows.splice(0, 1);
        this.clone_rows.splice(0, 1);
        this.newRowAct = false;
      }

    }
  }

  discardEditForce(index) {
    let me = this;
    if (this.newRowAct) {
      this.rows.splice(0, 1);
      this.clone_rows.splice(0, 1);
      this.newRowAct = false;
    } else {
      setTimeout(
        function () {
          me.rows = cloneObject(me.clone_rows);
        },
        0
      );
    }

    this.addEditable();
  }

  removeRow(ListIndex, id) {
    // this.rows.splice(ListIndex, 1);
    // for (let index = 0; index < this.registres.length; index++) {
    //   if(this.registres[index].id == id ){
    //     this.registres.splice(index, 1);
    //     break;
    //   }
    // }
    // this.changeRowPerPage();

    // enviar id
    this.deleteEditableEvent.emit({ id: id });
  }

  updateEditable(row) {
    this.updateEditableEvent.emit(row);
    this.newRowAct = false;
  }

  newRow() {
    // console.log('nueva fila');
    if (!this.newRowAct) {

      let newObj: any = {};
      newObj.editable = true;
      this.newRowAct = true;
      this.addEditable();
      this.rows.unshift(newObj);

      this.clone_rows.unshift(cloneObject(newObj));

      this.focusIn(0);

    }

  }

  save(row, save_new = 0) {
    if (this.newRowAct) {
      this.saveNew(row, save_new)
    } else {
      this.updateEditable(row)
    }

  }

  saveNew(row, save_new = 0) {
    if (save_new) row.save_new = 1; else row.save_new = 0;
    this.newEditableEvent.emit(row);
    this.rows.splice(0, 1);
    this.clone_rows.splice(0, 1);
    this.newRowAct = false;
    // if ( save_new ) {
    //   console.log('y nuevo');
    //   this.rows.splice(0, 1);
    //   this.newRow();
    // } else
    //   this.rows.splice(0, 1);
  }

  saveAndNew(row) {
    this.save(row, 1);
    // this.newRow();
  }

  getImagen(row) {

    let val2;
    // console.log("is url",isUrl(row[this.imageProperty]),row[this.imageProperty] )
    if (isUrl(row[this.imageProperty])) {

      // val2 = (row[this.imageProperty] != null)?
      //       BananaConstants.urlServer +'storage/img/'+ row[this.imageProperty] : this.defaultImg;
      // BananaConstants.urlServer +'storage/img/'+ row[this.imageProperty] : null;
      val2 = row[this.imageProperty];
    } else {
      val2 = BananaConstants.urlServerStorage + 'storage/img/' + row[this.imageProperty]
    }



    return val2;
  }

  updateUrlImg(row) {
    row[this.imageProperty] = this.defaultImg;
  }

  updateRows() {
    if (this.registres.length == 0) this.rows = [];
    this.refreshTotalRegisters();
    this.addEditable();
    this.goToPage(this.page);
  }

  getUrlImage(image) {
    return (image == null || image === undefined) ? null : this.image_url + image;
  }

  select(options, id) {
    return getValuesOfSelect(options, id);
  }

  changeHeadersSetting() {
    if (this.data_table.id != null) {
      this.changePositionElementsTableList();
      return;
    }

    let body: any = {};
    let clone_column_headers: Array<any> = cloneObject(this.columnHeaders);

    body.table_id = this.table;

    body.setting = JSON.stringify(clone_column_headers);

    this._tableListSettingsService.updateTableListSetting(body).subscribe(
      result => {
        // console.log('listo');
      },
      msg => {
        if (msg.status == 406) {
          tokenUtil(this.router);
        }
        notifyManage(msg);
      }
    );
  }

  getHeadersSetting() {

    if (this.table == 0) return;

    let body: any = { table_id: this.table };

    this._tableListSettingsService.getTableListSettings(body).subscribe(
      result => {
        let body: any = result
        let setting = JSON.parse(body.table_list_setting) || null
        if (setting != null) {
          this.columnHeaders = setting;
          this.columnHeaders.forEach(element => {

            if (element.hasOwnProperty('icon') && element['icon'] != "") {

              if (element['icon'] == 'fa fa-sort-down') {
                this.ordDESC(element.key);
              } else {
                this.ordASC(element.key);
              }

              return;
            }

          });
          // console.log( this.const_column_headers, 'constante');
        }

        // console.log(  JSON.parse(body.table_list_setting) );
      },
      msg => {
        if (msg.status == 406) {
          tokenUtil(this.router);
        }
        notifyManage(msg);
      }
    );
  }

  changePositionElementsTableList() {
    this.loading = true;
    this._generate_form_service.changePositionElementsTableList(this.columnHeaders).subscribe(
      (result: any) => {
        this.loading = false;
      },
      error => {
        if (error.status == 406) tokenUtil(this.router);

        this.loading = false;
        notifyManage(error);
      });
  }

  getElementsTableList() {

    if (this.table == 0) return;

    this.loading = true;
    this._generate_form_service.getElementsTableList(this.table).subscribe(
      (result: any) => {
        if (result.data_table != null) {
          this.data_table = result.data_table;
          this.columnHeaders = result.elements;
          this.addAditionalProp();
        } else {
          this.getHeadersSetting();
        }
        this.loading = false;
      },
      error => {
        if (error.status == 406) tokenUtil(this.router);

        this.loading = false;
        notifyManage(error);
      });
  }

  deselectOption(object, property_name) {
    let me = object;

    setTimeout(function () {
      me[property_name] = null;
    }, 0);
  }

  keyboard(event, row, i) {

    if (event == 13) {
      this.save(row)
    } else if (event == 27) {
      this.discardEdit(row, i)
    } else if (event == 46) {
      this.removeRow(i, row.id)

    } else {
      // console.log(event)
    }

  }

  getTypeColumn(column: any) {
    let type = 'text';

    if (column.hasOwnProperty('type_column')) {
      type = column.type_column;
    }

    return type;
  }

  emitViewEvent(row) {
    this.viewEvent.emit(row);
  }

}
