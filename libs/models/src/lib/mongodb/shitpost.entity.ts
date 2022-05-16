import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IShitpostMongo } from '@shitpost-generator/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm';
import { BaseMongo } from './base.entity';
import { UserMongo } from './user.entity';

@Entity('shitposts')
export class ShitpostMongo extends BaseMongo implements IShitpostMongo {
  @ApiModelProperty()
  @ObjectIdColumn()
  id!: string;

  @ApiModelProperty()
  @Column({ length: 150 })
  text!: string;

  @ApiModelProperty()
  @Column()
  sfw!: boolean;

  @ApiModelProperty()
  @Column({ default: false }) // doesn't do anything with MongoDb
  isEnabled!: boolean;

  @ApiModelProperty()
  @ManyToOne(() => UserMongo, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: UserMongo;

  @Column()
  tags!: string[];
}
