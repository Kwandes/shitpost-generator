import { TagNeo, UserNeo } from '@models';
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
  CreateTagNeoRequest,
  ITagNeo,
  Role,
  UpdateTagNeoRequest,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { TagsService } from './tags.service';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get a list of all tags. Role: Admin' })
  @ApiOkResponse({ type: [TagNeo] })
  async getAll(): Promise<ITagNeo[]> {
    return this.tagsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a tag by id. Role: Admin' })
  @ApiOkResponse({ type: TagNeo })
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<ITagNeo> {
    return this.tagsService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('tag/:tag')
  @ApiOperation({ summary: 'Get a a tag by tag. Role: Admin' })
  @ApiOkResponse({ type: TagNeo })
  getOneByEmail(@Param('tag') tag: string): Promise<ITagNeo> {
    return this.tagsService.findOneByEmail(tag);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update tag by id. Role: Admin' })
  @ApiOkResponse({ type: TagNeo })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateTagNeoRequest
  ): Promise<ITagNeo> {
    return this.tagsService.update(request, id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post()
  @ApiOperation({ summary: 'Create a new tag. Role: Admin' })
  @ApiOkResponse({ type: TagNeo })
  create(
    @Body() request: CreateTagNeoRequest,
    @AuthUser() user: UserNeo
  ): Promise<ITagNeo> {
    return this.tagsService.create(request, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific tag. Role: Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tagsService.perish(id);
  }
}
