import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IShitpostTag } from '@shitpost-generator/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('shitpost_tags')
export class ShitpostTag extends Base implements IShitpostTag {
  @ApiModelProperty({
    example: '479876aa-4d9a-47b8-9498-89ffe6c50474',
    type: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  tagId: string;

  @ApiModelProperty()
  @Column({ length: 50 })
  tag: string;

  @ApiModelProperty()
  @Column({ default: false })
  sfw: boolean;

  @ApiModelProperty()
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: User;
}
