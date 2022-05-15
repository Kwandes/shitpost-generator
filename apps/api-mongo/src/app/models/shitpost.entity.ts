import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IShitpost } from '@shitpost-generator/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectIdColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { ShitpostTag } from './shitpost-tag.entity';
import { User } from './user.entity';

@Entity('shitposts')
export class Shitpost extends Base implements IShitpost {
  @ApiModelProperty({
    example: '479876aa-4d9a-47b8-9498-89ffe6c50474',
    type: 'uuid',
  })
  @ObjectIdColumn()
  shitpostId!: string;

  @ApiModelProperty()
  @Column({ length: 150 })
  text!: string;

  @ApiModelProperty()
  @Column()
  sfw!: boolean;

  @ApiModelProperty()
  @Column({ default: false })
  isEnabled!: boolean;

  @ApiModelProperty()
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: User;

  @ManyToMany(() => ShitpostTag, { nullable: true })
  @JoinTable()
  tags!: ShitpostTag[];
}
