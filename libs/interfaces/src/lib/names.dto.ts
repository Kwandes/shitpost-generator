import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Gender } from './gender.enum';
import {
  ICreateNameRequest,
  ICreateNameRequestMongo,
  IUpdateNameRequst,
  IUpdateNameRequstMongo,
} from './names.interface';

export class CreateNameRequest implements ICreateNameRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @ApiModelProperty({ type: 'enum', enum: Object.keys(Gender) })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiModelProperty()
  @IsBoolean()
  isEnabled!: boolean;

  @ApiModelProperty()
  @IsUUID('all', { each: true })
  tags!: string[];
}

export class CreateNameRequestMongo implements ICreateNameRequestMongo {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @ApiModelProperty({ type: 'enum', enum: Object.keys(Gender) })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiModelProperty()
  @IsBoolean()
  isEnabled!: boolean;

  @ApiModelProperty()
  @IsString({ each: true })
  tags!: string[];
}

export class UpdateNameRequest implements IUpdateNameRequst {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @ApiModelProperty({ type: 'enum', enum: Object.keys(Gender) })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiModelProperty()
  @IsBoolean()
  isEnabled!: boolean;

  @ApiModelProperty()
  @IsUUID('all', { each: true })
  tags!: string[];
}

export class UpdateNameRequestMongo implements IUpdateNameRequstMongo {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @ApiModelProperty({ type: 'enum', enum: Object.keys(Gender) })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiModelProperty()
  @IsBoolean()
  isEnabled!: boolean;

  @ApiModelProperty()
  @IsString({ each: true })
  tags!: string[];
}
