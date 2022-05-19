import { NameNeo, UserNeo } from '@models';
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
  CreateNameRequestNeo,
  INameNeo,
  Role,
  UpdateNameRequestNeo,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { NamesService } from './names.service';

@ApiBearerAuth()
@ApiTags('names')
@Controller('names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @Get('')
  @ApiOperation({ summary: 'Get a list of all names. Role: Admin' })
  @ApiOkResponse({ type: [NameNeo] })
  async getAll(): Promise<INameNeo[]> {
    return this.namesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a name by id. Role: Admin' })
  @ApiOkResponse({ type: NameNeo })
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<INameNeo> {
    return this.namesService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('name/:name')
  @ApiOperation({ summary: 'Get a a name by name. Role: Admin' })
  @ApiOkResponse({ type: NameNeo })
  getOneByEmail(@Param('name') name: string): Promise<INameNeo> {
    return this.namesService.findOneByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update name by id. Role: Admin' })
  @ApiOkResponse({ type: NameNeo })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateNameRequestNeo
  ): Promise<INameNeo> {
    return this.namesService.update(request, id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post()
  @ApiOperation({ summary: 'Create a new name. Role: Admin' })
  @ApiOkResponse({ type: NameNeo })
  create(
    @Body() request: CreateNameRequestNeo,
    @AuthUser() user: UserNeo
  ): Promise<INameNeo> {
    return this.namesService.create(request, user);
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
