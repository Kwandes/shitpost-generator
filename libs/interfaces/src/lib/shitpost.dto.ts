import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ICreateShitpostRequest } from './shitpost.interface';

export class CreateShitpostRequest implements ICreateShitpostRequest {
  @IsString()
  @IsNotEmpty()
  text!: string;
  @IsBoolean()
  sfw!: boolean;
}
