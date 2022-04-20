import { Role } from './role.enum';

export interface ILoginRequestDto {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  role: Role;
}

export interface ISignupRequestDto {
  email: string;
  password: string;
}

export interface ISignupResponse {
  accessToken: string;
  role: Role;
}
