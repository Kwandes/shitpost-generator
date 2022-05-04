import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ICreateShitpostRequest,
  IUpdateShitpostRequst,
} from './shitpost.interface';

export class CreateShitpostRequest implements ICreateShitpostRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;

  @ApiModelProperty()
  @IsUUID('all', { each: true })
  tags!: string[];
}

export class UpdateShitpostRequest implements IUpdateShitpostRequst {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;

  @ApiModelProperty()
  @IsBoolean()
  isEnabled!: boolean;

  @ApiModelProperty()
  @IsUUID('all', { each: true })
  @IsOptional()
  tags?: string[];
}
