import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ICreateShitpostRequestMongo,
  IUpdateShitpostRequstMongo,
} from './shitpost.interface';

export class CreateShitpostRequest implements CreateShitpostRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;

  @ApiModelProperty()
  @IsUUID('all', { each: true })
  @IsOptional()
  tags!: string[];
}

export class CreateShitpostRequestMongo implements ICreateShitpostRequestMongo {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;

  @ApiModelProperty()
  @IsOptional()
  tags!: string[];
}

export class UpdateShitpostRequest implements UpdateShitpostRequest {
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

export class UpdateShitpostRequestMongo implements IUpdateShitpostRequstMongo {
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
  @IsOptional()
  tags?: string[];
}
