import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Gender, IName } from '@shitpost-generator/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { NameTag } from './name-tag.entity';
import { User } from './user.entity';

@Entity('names')
export class Name extends Base implements IName {
  @ApiModelProperty({
    example: '479876aa-4d9a-47b8-9498-89ffe6c50474',
    type: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  nameId!: string;

  @ApiModelProperty()
  @Column({ length: 80 })
  name!: string;

  @ApiModelProperty()
  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @ApiModelProperty()
  @Column({ default: false })
  isEnabled!: boolean;

  @ApiModelProperty()
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: User;

  @ManyToMany(() => NameTag)
  @JoinTable()
  tags!: NameTag[];
}
