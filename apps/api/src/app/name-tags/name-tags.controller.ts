import { NameTag, User } from '@models';
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
  CreateNameTagRequest,
  INameTag,
  Role,
  UpdateNameTagRequst,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { NameTagsService } from './name-tags.service';

@ApiBearerAuth()
@ApiTags('name-tags')
@Controller('tags/names')
export class NameTagsController {
  constructor(private readonly nameTagsService: NameTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all name tags. Role: Admin' })
  @ApiOkResponse({ type: [NameTag] })
  async getAll(): Promise<INameTag[]> {
    return this.nameTagsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a name tag by id. Role: Admin' })
  @ApiOkResponse({ type: NameTag })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<INameTag> {
    return this.nameTagsService.findOne(id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post('')
  @ApiOperation({
    summary:
      'Create a new name tag entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: NameTag })
  create(
    @Body() request: CreateNameTagRequest,
    @AuthUser() user: User
  ): Promise<INameTag> {
    return this.nameTagsService.create(request, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update name tag by id. Role: Admin' })
  @ApiOkResponse({ type: NameTag })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequest: UpdateNameTagRequst
  ): Promise<INameTag> {
    return this.nameTagsService.update(updateRequest, id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific name tag. Role: Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.nameTagsService.perish(id);
  }
}
