import { IUserNeo } from './user.interface';

export interface ITagNeo {
  tagId: string;
  tag: string;
  sfw: boolean;
  createdBy?: IUserNeo;
}

export interface ICreateTagNeoRequest {
  tag: string;
  sfw: boolean;
}

export interface IUpdateTagNeoRequest {
  tag: string;
  sfw: boolean;
}
