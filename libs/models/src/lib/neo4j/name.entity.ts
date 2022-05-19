import {
  Gender,
  INameNeo,
  ITagNeo,
  IUserNeo,
} from '@shitpost-generator/interfaces';

export class NameNeo implements INameNeo {
  nameId!: string;
  name!: string;
  gender!: Gender;
  isEnabled!: boolean;
  createdBy?: IUserNeo;
  tags!: ITagNeo[];

  constructor(
    id: string,
    name: string,
    gender: Gender,
    tags: ITagNeo[],
    createdBy?: IUserNeo
  ) {
    this.nameId = id;
    this.name = name;
    this.gender = gender;
    if (createdBy) {
      this.createdBy = createdBy;
    }
    this.tags = tags;
  }
}
