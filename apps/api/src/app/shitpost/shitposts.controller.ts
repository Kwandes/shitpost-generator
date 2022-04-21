import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateShitpostRequest,
  ICreateShitpostResponse,
  IShitpost,
  Role,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { User } from '../models/user.entity';
import { ShitpostsService } from './shitposts.service';

@Controller('shitposts')
export class ShitpostsController {
  constructor(private readonly shitpostsService: ShitpostsService) {}

  @Get('')
  async getAll(): Promise<IShitpost[]> {
    return this.shitpostsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':shitpostId')
  get(@Param('shitpostId') shitpostId: string): Promise<IShitpost> {
    return this.shitpostsService.findOne(shitpostId);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post('')
  create(
    @Body() createShitpostRequest: CreateShitpostRequest,
    @AuthUser() user: User
  ): Promise<ICreateShitpostResponse> {
    return this.shitpostsService.create(createShitpostRequest, user);
  }
}
