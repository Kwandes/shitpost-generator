import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  ICreateNameTagRequest,
  IUpdateNameTagRequest,
} from './name-tags.interface';

export class CreateNameTagRequest implements ICreateNameTagRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tag!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;
}

export class UpdateNameTagRequst implements IUpdateNameTagRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tag!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;
}
