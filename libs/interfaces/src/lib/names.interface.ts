import { Gender } from './gender.enum';
import { IBase } from './interfaces';
import { IUser } from './user.interface';

export interface IName extends IBase {
  nameId: string;
  name: string;
  gender: Gender;
  isEnabled: boolean;
  createdBy?: IUser;
}

export interface ICreateNameRequest {
  name: string;
  gender: Gender;
  isEnabled: boolean;
}

export interface IUpdateNameRequst {
  name: string;
  gender: Gender;
  isEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateNameResponse extends IName {}
