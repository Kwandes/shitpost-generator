import { ITagNeo, IUserNeo } from '@shitpost-generator/interfaces';

export class TagNeo implements ITagNeo {
  tagId!: string;
  tag!: string;
  sfw!: boolean;
  createdBy?: IUserNeo;

  constructor(id: string, tag: string, sfw: boolean, createdBy?: IUserNeo) {
    this.tag = id;
    this.tag = tag;
    this.sfw = sfw;
    if (createdBy) {
      this.createdBy = createdBy;
    }
  }
}
