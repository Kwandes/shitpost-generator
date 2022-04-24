import { IBase } from './interfaces';
import { IUser } from './user.interface';

export interface IShitpostTag extends IBase {
  tagId: string;
  tag: string;
  sfw: boolean;
  createdBy?: IUser;
}

export interface ICreateShitpostTagRequest {
  tag: string;
  sfw: boolean;
}

export interface IUpdateShitpostTagRequst {
  tag: string;
  sfw: boolean;
}
