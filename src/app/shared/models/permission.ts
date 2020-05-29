interface IPermissions {
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

export class Permissions {
  create = false;
  update = false;
  read = false;
  delete = false;

  // constructor (c, r, u, d){
  //   this.create =  ( c == 1)? true: false ;
  //   this.Read =  ( r == 1)? true: false ;
  //   this.update =  ( u == 1)? true:false ;
  //   this.delete =  ( d == 1)? true:false ;
  // }

  constructor (obj? : IPermissions){

    this.create =  obj && obj.create || false;
    this.read =  obj && obj.read || false;
    this.update =  obj && obj.update || false;
    this.delete =  obj && obj.delete || false;

  };




}
