export class User {
  id: number = -1;
  name: string = '';
  email: string = '';
  all_access_organization: number = 0;
  all_access_column: number = 0;
  password: string = '';
  archived: number = 0;
  image_name: string = '';
  username_smtp: string = '';
  password_smtp: string = '';
  port_smtp: number = null;
  host_smtp: string = '';
  encryption_smtp: string = '';
  rols: Array<any> = [];
}
