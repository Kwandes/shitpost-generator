import { ShitpostTag, User } from '@models';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateShitpostTagRequest,
  IShitpostTag,
  Role,
  UpdateShitpostTagRequst,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { ShitpostTagsService } from './shitposts-tags.service';

@ApiBearerAuth()
@ApiTags('shitpost-tags')
@Controller('tags/shitposts')
export class ShitpostTagsController {
  constructor(private readonly shitpostTagsService: ShitpostTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all shitpost tags. Role: Admin' })
  @ApiOkResponse({ type: [ShitpostTag] })
  async getAll(): Promise<IShitpostTag[]> {
    return this.shitpostTagsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a shitpost tag by id. Role: Admin' })
  @ApiOkResponse({ type: ShitpostTag })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IShitpostTag> {
    return this.shitpostTagsService.findOne(id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post('')
  @ApiOperation({
    summary:
      'Create a new shitpost tag entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: ShitpostTag })
  create(
    @Body() request: CreateShitpostTagRequest,
    @AuthUser() user: User
  ): Promise<IShitpostTag> {
    return this.shitpostTagsService.create(request, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update shitpost tag by id. Role: Admin' })
  @ApiOkResponse({ type: ShitpostTag })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequest: UpdateShitpostTagRequst
  ): Promise<IShitpostTag> {
    return this.shitpostTagsService.update(updateRequest, id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific shitpost tag. Role: Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.shitpostTagsService.perish(id);
  }
}
