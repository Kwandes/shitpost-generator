import { IBase } from './interfaces';
import { IUser } from './user.interface';

export interface IShitpost extends IBase {
  shitpostId: string;
  text: string;
  sfw: boolean;
  isEnabled: boolean;
  createdBy?: IUser;
}

export interface ICreateShitpostRequest {
  text: string;
  sfw: boolean;
}

export interface IUpdateShitpostRequst {
  text: string;
  sfw: boolean;
  isEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateShitpostResponse extends IShitpost {}
