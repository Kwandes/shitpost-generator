import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { INameTag } from '@shitpost-generator/interfaces';
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('name_tags')
export class NameTag extends Base implements INameTag {
  @ApiModelProperty({
    example: '479876aa-4d9a-47b8-9498-89ffe6c50474',
    type: 'uuid',
  })
  @ObjectIdColumn()
  tagId!: string;

  @ApiModelProperty()
  @Column({ length: 50, unique: true })
  tag!: string;

  @ApiModelProperty()
  @Column({ default: false })
  sfw!: boolean;

  @ApiModelProperty()
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: User;
}
