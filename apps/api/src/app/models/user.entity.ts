import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IUser, Role } from '@shitpost-generator/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base implements IUser {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @ApiModelProperty()
  @Column({ length: 254, unique: true })
  email: string;

  @ApiModelProperty()
  @Column({ length: 120 })
  password: string;

  @ApiModelProperty()
  @Column({ type: 'enum', enum: Role, default: Role.admin })
  role: Role;
}
