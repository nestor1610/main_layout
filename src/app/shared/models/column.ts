import { Permissions } from './permission';

export class Column {
  id:number;
  name:string;
  permissions: Permissions;


  constructor (id, name, permisions){
    this.id = id || 0;
    this.name = name || 'sin nombre';
    this.permissions = new Permissions(permisions);
  };


}
