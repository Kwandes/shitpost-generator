import { NameMongo, UserMongo } from '@models';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
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
  CreateNameRequestMongo,
  ICreateNameResponseMongo,
  INameMongo,
  Role,
  UpdateNameRequestMongo,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { ParseObjectIdPipe } from '../shared/pipes/object-id-validation.pipe';
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
  @ApiOkResponse({ type: [NameMongo] })
  async getAll(): Promise<INameMongo[]> {
    return this.namesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a name by id. Role: Admin' })
  @ApiOkResponse({ type: NameMongo })
  get(@Param('id', ParseObjectIdPipe) id: string): Promise<INameMongo> {
    return this.namesService.findOne(id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post('')
  @ApiOperation({
    summary:
      'Create a new name entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: NameMongo })
  create(
    @Body() createNameRequest: CreateNameRequestMongo,
    @AuthUser() user: UserMongo
  ): Promise<ICreateNameResponseMongo> {
    return this.namesService.create(createNameRequest, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update name by id. Role: Admin' })
  @ApiOkResponse({ type: NameMongo })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateRequest: UpdateNameRequestMongo
  ): Promise<INameMongo> {
    return this.namesService.update(updateRequest, id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific name. Role: Admin',
  })
  delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.namesService.perish(id);
  }
}
