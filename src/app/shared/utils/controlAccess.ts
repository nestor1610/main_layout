import { BananaConstants } from '../../core/config/constants';
import { showNotification, notifyManage } from './notifyUtil';
import { BananaHeader } from '../../core/config/header';
import { Column } from '../models/column';
import { isArray } from 'util';


export class ControlAccess {
  public table;
  public http: any;
  public columnsTable: Column[] = [];
  private allAccessColumn = false;
  public canEdit = false;
  public canCreate = false;
  public canDelete = false;
  public canRead = false;


  constructor(http) {
    this.http = http;
    this.table = sessionStorage.getItem('table_id');
  }

  getAllAccesColumn() {
    return this.allAccessColumn;
  }

  getPermission(table = null) {

    if (table == null) {
      return showNotification('table es requerido table = ' + table, 2);
    }

    // const body: any = {};
    const params = {

      tableId: table
    };
    // showNotification('Obteniendo elementos', 2);

    this.http.post(BananaConstants.urlServer + 'api/access/accessByTable',
      params,
      BananaHeader()).toPromise().then(
        result => {

          this.getAllAccess(result.access);

          this.orderPermission(result.access, table, isArray(table));

        },
        msg => {

          $('.modal-backdrop').remove();
          notifyManage(msg);
        });
  }

  orderPermission(permissions, module, is_Array = false) {

    if (is_Array) {
      // console.log('es arreglo')
      permissions.forEach(table => {

        table.forEach(element => {

          let column: Column = new Column(
            element.column_id,
            element.column_name,
            {
              create: (element.create == 1) ? true : false,
              delete: (element.delete == 1) ? true : false,
              read: (element.read == 1) ? true : false,
              update: (element.update == 1) ? true : false,
            }
          )
          this.columnsTable.push(column)

        });

      });

    } else {
      // console.log('no es arreglo')
      permissions.forEach(element => {

        let column: Column = new Column(
          element.column_id,
          element.column_name,
          {
            create: (element.create == 1) ? true : false,
            delete: (element.delete == 1) ? true : false,
            read: (element.read == 1) ? true : false,
            update: (element.update == 1) ? true : false,
          }
        )
        this.columnsTable.push(column)

      });

    }

    this.findAtLeast('update');
    this.findAtLeast('create');
    this.findAtLeast('delete');
    this.findAtLeast('read');

  }

  getAllAccess(result) {

    // if( isArray(result) ){
    //   console.log("es arreglo", result)
    // }else{
    //   console.log("no es arreglo", result)
    // }
    result.forEach(element => {

      // console.log("element", element[0])
      if (!isArray(element)) {
        if (element.all_access_column !== undefined) {
          this.allAccessColumn = true;
          return;
        }
      }
      if (element[0] !== undefined) {
        if (element[0].all_access_column !== undefined) {
          // console.log("entro")
          this.allAccessColumn = true;
          // return;
        }
      }
    });
  }

  getValue(id, type) {

    // this.columnsTable = JSON.parse( localStorage.getItem('access_' + table) );

    if (this.allAccessColumn) {
      return true;
    }

    let perm = null;
    let result = false;
    switch (type) {
      case 'C':
        perm = 'create';
        break;
      case 'R':
        perm = 'read';
        break;
      case 'U':
        perm = 'update';
        break;
      case 'D':
        perm = 'delete';
        break;

    }

    if (perm == null) {
      return false;
    } else {
      this.columnsTable.forEach(element => {

        if (element.id == id) {
          // console.log('encotro la columna')
          result = element.permissions[perm];

          return;
        }

      });

      return result;
    }


  }

  disabled(readOnly, id, type_view = null) {

    if (!readOnly) {

      if (type_view === null) {
        return !(this.getValue(id, 'C') || this.getValue(id, 'U'));
      } else {

        switch (type_view) {
          case 1:
            return !this.getValue(id, 'C');
          // break;

          case 3:
            return !this.getValue(id, 'U');
          // break;

          case 5:
            return true;
          // break;

          default:
            return !(this.getValue(id, 'C') || this.getValue(id, 'U'));
          // break;
        }

      }
      /*  */
    } else {
      return true;
    }
  }

  findAtLeast(type) {

    if (this.allAccessColumn) {
      this.canCreate = true;
      this.canEdit = true;
      this.canDelete = true;
      this.canRead = true;
    }

    this.columnsTable.forEach(element => {
      // console.log(element);
      if (element.permissions[type] == true) {

        if (type == 'create') {

          this.canCreate = true;

        } else if (type == 'update') {

          this.canEdit = true;

        } else if (type == 'delete') {

          this.canDelete = true;

        } else if (type == 'read') {

          this.canRead = true;

        }


        return;
      }

    });
  }


}
