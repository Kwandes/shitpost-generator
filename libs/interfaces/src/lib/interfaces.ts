export interface IMessage {
  message: string;
}

export interface IBase {
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IUser {
  userId: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
