import {
  IShitpostNeo,
  ITagNeo,
  IUserNeo,
} from '@shitpost-generator/interfaces';

export class ShitpostNeo implements IShitpostNeo {
  shitpostId!: string;
  text!: string;
  sfw!: boolean;
  isEnabled!: boolean;
  createdBy?: IUserNeo;
  tags!: ITagNeo[];

  constructor(
    id: string,
    text: string,
    sfw: boolean,
    tags: ITagNeo[],
    createdBy?: IUserNeo
  ) {
    this.shitpostId = id;
    this.text = text;
    this.sfw = sfw;
    if (createdBy) {
      this.createdBy = createdBy;
    }
    this.tags = tags;
  }
}
