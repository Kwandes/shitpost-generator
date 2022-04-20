import { Controller, Get } from '@nestjs/common';

import { IMessage } from '@shitpost-generator/interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): IMessage {
    return this.appService.getData();
  }
}
