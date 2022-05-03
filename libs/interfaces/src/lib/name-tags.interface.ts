import { IBase } from './interfaces';
import { IUser } from './user.interface';

export interface INameTag extends IBase {
  tagId: string;
  tag: string;
  sfw: boolean;
  createdBy?: IUser;
}

export interface ICreateNameTagRequest {
  tag: string;
  sfw: boolean;
}

export interface IUpdateNameTagRequest {
  tag: string;
  sfw: boolean;
}
