import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ICreateShitpostRequest } from './shitpost.interface';

export class CreateShitpostRequest implements ICreateShitpostRequest {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiModelProperty()
  @IsBoolean()
  sfw!: boolean;
}
