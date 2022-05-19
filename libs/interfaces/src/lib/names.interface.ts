import { Gender } from './gender.enum';
import { IBase } from './interfaces';
import { INameTag } from './name-tags.interface';
import { ITagNeo } from './tag-neo.interface';
import { IUser, IUserMongo, IUserNeo } from './user.interface';

export interface IName extends IBase {
  nameId: string;
  name: string;
  gender: Gender;
  isEnabled: boolean;
  createdBy?: IUser;
  tags: INameTag[];
}

export interface INameMongo extends IBase {
  id: string;
  name: string;
  gender: Gender;
  isEnabled: boolean;
  createdBy?: IUserMongo;
  tags: string[];
}

export interface INameNeo {
  nameId: string;
  name: string;
  gender: Gender;
  isEnabled: boolean;
  createdBy?: IUserNeo;
  tags: ITagNeo[];
}
export interface ICreateNameRequest {
  name: string;
  gender: Gender;
  isEnabled: boolean;
  tags: string[];
}

export interface ICreateNameRequestMongo {
  name: string;
  gender: Gender;
  isEnabled: boolean;
  tags: string[];
}

export interface ICreateNameRequestNeo {
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

export interface IUpdateNameRequstMongo {
  name: string;
  gender: Gender;
  isEnabled: boolean;
  tags: string[];
}
export interface IUpdateNameRequstNeo {
  name: string;
  gender: Gender;
  isEnabled: boolean;
  tags: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateNameResponse extends IName {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateNameResponseMongo extends INameMongo {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateNameResponseNeo extends INameNeo {}
