import { IUserNeo, Role } from '@shitpost-generator/interfaces';

export class UserNeo implements IUserNeo {
  id!: string;
  email!: string;
  password!: string;
  role!: Role;

  constructor(id: string, email: string, password: string, role: Role) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
