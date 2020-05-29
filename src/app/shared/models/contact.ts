import { User } from './user';

export class Contact {
  id: number = 0;
  name: string = '';
  description: string = '';
  comments: string = '';
  archived: number = 0;
  email: string = '';
  phone: string = '';
  phone_2: string = '';
  fax: string = '';
  title: string = '';
  charge: string = '';
  birthday: string = '';
  last_contact: string = '';
  last_result: string = '';
  user: User = new User();
  with_user: number = 0;
  // rols: Array<any> = [];
}