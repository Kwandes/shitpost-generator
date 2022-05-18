import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from './role.enum';
import { IUpdateUserNeoRequest } from './user.interface';

export class UpdateUserNeoRequest implements IUpdateUserNeoRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  email!: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password!: string;

  @ApiModelProperty()
  @IsEnum(Role)
  role!: Role;
}
