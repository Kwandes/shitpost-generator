import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {
  ICreateTagNeoRequest,
  IUpdateTagNeoRequest,
} from './tag-neo.interface';

export class CreateTagNeoRequest implements ICreateTagNeoRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  tag!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;
}

export class UpdateTagNeoRequest implements IUpdateTagNeoRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  tag!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;
}
