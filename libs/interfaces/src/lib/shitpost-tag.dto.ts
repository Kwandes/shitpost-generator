import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  ICreateShitpostTagRequest,
  IUpdateShitpostTagRequst,
} from './shitpost-tag.interface';

export class CreateShitpostTagRequest implements ICreateShitpostTagRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tag!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;
}

export class UpdateShitpostTagRequst implements IUpdateShitpostTagRequst {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tag!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;
}
