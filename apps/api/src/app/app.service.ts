import { Injectable } from '@nestjs/common';
import { IMessage } from '@shitpost-generator/interfaces';

@Injectable()
export class AppService {
  getData(): IMessage {
    return { message: 'Welcome to api!' };
  }
}
