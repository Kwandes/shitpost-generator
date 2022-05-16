import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IUserMongo, Role } from '@shitpost-generator/interfaces';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { BaseMongo } from './base.entity';

@Entity('users')
export class UserMongo extends BaseMongo implements IUserMongo {
  @ApiModelProperty()
  @ObjectIdColumn()
  id!: string;

  @ApiModelProperty()
  @Column({ length: 254, unique: true })
  email!: string;

  @ApiModelProperty()
  @Column({ length: 120 })
  password!: string;

  @ApiModelProperty()
  @Column({ type: 'enum', enum: Role, default: Role.admin })
  role!: Role;
}
