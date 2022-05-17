import { IUserNeo, Role } from '@shitpost-generator/interfaces';

export class UserNeo implements IUserNeo {
  email!: string;
  password!: string;
  role!: Role;

  constructor(email: string, password: string, role: Role) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
