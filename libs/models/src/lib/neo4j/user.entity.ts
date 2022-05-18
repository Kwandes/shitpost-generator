import { IUserNeo, Role } from '@shitpost-generator/interfaces';

export class UserNeo implements IUserNeo {
  userId!: string;
  email!: string;
  password!: string;
  role!: Role;

  constructor(id: string, email: string, password: string, role: Role) {
    this.userId = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
