import { IBase } from './interfaces';
import { IShitpostTag } from './shitpost-tag.interface';
import { ITagNeo } from './tag-neo.interface';
import { IUser, IUserMongo, IUserNeo } from './user.interface';

export interface IShitpost extends IBase {
  shitpostId: string;
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  createdBy?: IUser;
  tags: IShitpostTag[];
}

export interface IShitpostMongo extends IBase {
  id: string;
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  createdBy?: IUserMongo;
  tags: string[];
}

export interface IShitpostNeo extends IBase {
  shitpostId: string;
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  createdBy?: IUserNeo;
  tags: ITagNeo[];
}

export interface ICreateShitpostRequest {
  text: string;
  sfw: boolean;
  tags: string[];
}

export interface ICreateShitpostRequestMongo {
  text: string;
  sfw: boolean;
  tags: string[];
}

export interface ICreateShitpostRequestNeo {
  text: string;
  sfw: boolean;
  tags: string[];
}

export interface IUpdateShitpostRequst {
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  tags?: string[];
}

export interface IUpdateShitpostRequstMongo {
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  tags?: string[];
}

export interface IUpdateShitpostRequstNeo {
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  tags?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateShitpostResponse extends IShitpost {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateShitpostResponseMongo extends IShitpostMongo {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateShitpostResponseNeo extends IShitpostNeo {}
