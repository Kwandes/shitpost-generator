import { Gender } from './gender.enum';
import { IBase } from './interfaces';
import { INameTag } from './name-tags.interface';
import { IUser } from './user.interface';

export interface IName extends IBase {
  nameId: string;
  name: string;
  gender: Gender;
  isEnabled: boolean;
  createdBy?: IUser;
  tags: INameTag[];
}

export interface ICreateNameRequest {
  name: string;
  gender: Gender;
  isEnabled: boolean;
  tags: string[];
}

export interface IUpdateNameRequst {
  name: string;
  gender: Gender;
  isEnabled: boolean;
  tags: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateNameResponse extends IName {}
