import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Gender, INameMongo } from '@shitpost-generator/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm';
import { BaseMongo } from './base.entity';
import { UserMongo } from './user.entity';

@Entity('names')
export class NameMongo extends BaseMongo implements INameMongo {
  @ApiModelProperty()
  @ObjectIdColumn()
  id!: string;

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
  @ManyToOne(() => UserMongo, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: UserMongo;

  @Column()
  tags!: string[];
}
