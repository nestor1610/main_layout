import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { InternationalizationUtil } from '../../utils/internationalizationUtil';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-menu-control',
  templateUrl: './menu-control.component.html',
  styleUrls: ['./menu-control.component.scss']
})
export class MenuControlComponent implements OnInit {
  @Input() contextId = 0;
  // Si tiene input filtro
  @Input() haveFilterInput = false;
  // Tiene filtro
  @Input() haveFilter = false;
  // Opciones del filtro
  @Input() otherFilter: any[] = [];
  //  Filtro actual
  current_filter: string = '';
  // Tiene archivar/desarchivar
  @Input() haveArchived = false;
  // Arreglo de objecto para botones con funcionalidades dependiendo del CRUD
  @Input() functionButtons: Array<{ id: number, name: string, icon: string, class: string, disabled: boolean, show: boolean, value: any }> = [];
  // Referencia del boton archivar
  @Input() archivedReference: any = 0;
  // Tiene hacia atras
  @Input() haveBack = true;
  // Tiene cancelar
  @Input() haveCancel = true;
  // Id de la tabla a cual pertenece
  @Input() table;
  // Tablas auxiliares
  @Input() auxTables: any[] = [];
  // Evento del filtro
  @Output() filterEvent = new EventEmitter<any>();
  // Tipo de vista
  @Input() typeView = 2;
  // ver boton crear forzado
  @Input() view_force_create = false;
  // Tiene otros controles
  @Input() otherControls = false;
  // tiene migracion
  @Input() why_migration = false;
  // Evento del filtro generico
  @Output() genericFilter = new EventEmitter<any>();
  // Evento del filtro generico
  @Output() functionButtonEvent = new EventEmitter<any>();
  // Eventos
  @Output() newEvent = new EventEmitter<any>();
  @Output() typeListEvent = new EventEmitter<any>();
  @Output() createEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() archivateEvent = new EventEmitter<any>();
  @Output() discardEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();
  @Output() backEvent = new EventEmitter<any>();

  @Input() haveOptions = false;

  @Input() editBtnDisabled = false;
  @Input() deleteBtnDisabled = false;
  @Input() createBtnDisabled = false;



  public lbl: InternationalizationUtil;
  keyword = '';

  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.lbl = new InternationalizationUtil(this.http, this.table);

    if (this.otherFilter.length > 0) {
      this.current_filter = this.otherFilter[0].name;
    }
  }

  newly() {
    this.newEvent.emit('8');
  }
  create() {
    this.createEvent.emit('1');
  }
  edit() {
    this.editEvent.emit('5');
  }
  update() {
    this.updateEvent.emit('2');
  }
  delete() {
    this.deleteEvent.emit('4');
  }
  discard() {
    this.discardEvent.emit('3');
  }
  cancel() {
    this.cancelEvent.emit('6');
  }
  back() {
    this.backEvent.emit('7');
  }
  archivate(type) {
    this.archivateEvent.emit(type);
  }


  searchByOtherFilter(value, name = '') {
    this.filterEvent.emit(value);
    this.keyword = '';

    if (this.otherFilter.length > 0 && name != '') {
      this.current_filter = name;
    } else if (this.otherFilter.length > 0) {
      this.current_filter = this.otherFilter[0].name;
    }
  }

  search() {
    this.genericFilter.emit(this.keyword);

    if (this.otherFilter.length > 0) {
      this.current_filter = this.otherFilter[0].name;
    }
  }

  goTo(route) {

    this.router.navigate([route]);
  }

  changeList(type) {
    this.typeListEvent.emit(type);
  }

  emitFunctionButton(item) {
    this.functionButtonEvent.emit(item);
  }

}
