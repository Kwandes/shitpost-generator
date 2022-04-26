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
  CreateNameRequest,
  ICreateNameResponse,
  IName,
  Role,
  UpdateNameRequest,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { Name } from '../models/name.entity';
import { User } from '../models/user.entity';
import { NamesService } from './names.service';

@ApiBearerAuth()
@ApiTags('names')
@Controller('names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('')
  @ApiOperation({ summary: 'Get a list of all names. Role: Admin' })
  @ApiOkResponse({ type: [Name] })
  async getAll(): Promise<IName[]> {
    return this.namesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a name by id. Role: Admin' })
  @ApiOkResponse({ type: Name })
  get(@Param('id', ParseUUIDPipe) id: string): Promise<IName> {
    return this.namesService.findOne(id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post('')
  @ApiOperation({
    summary:
      'Create a new name entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: Name })
  create(
    @Body() createNameRequest: CreateNameRequest,
    @AuthUser() user: User
  ): Promise<ICreateNameResponse> {
    return this.namesService.create(createNameRequest, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update name by id. Role: Admin' })
  @ApiOkResponse({ type: Name })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequest: UpdateNameRequest
  ): Promise<IName> {
    return this.namesService.update(updateRequest, id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific name. Role: Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.namesService.perish(id);
  }
}
