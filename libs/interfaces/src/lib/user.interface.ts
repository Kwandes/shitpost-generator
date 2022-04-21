import { IBase } from './interfaces';
import { Role } from './role.enum';

export interface IUser extends IBase {
  userId: string;
  email: string;
  password: string;
  role: Role;
}