import { IBase } from './interfaces';
import { IShitpostTag } from './shitpost-tag.interface';
import { IUser } from './user.interface';

export interface IShitpost extends IBase {
  shitpostId: string;
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  createdBy?: IUser;
  tags: IShitpostTag[];
}

export interface ICreateShitpostRequest {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateShitpostResponse extends IShitpost {}
