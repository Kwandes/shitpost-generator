import { ShitpostNeo, UserNeo } from '@models';
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
  CreateShitpostRequestNeo,
  IShitpostNeo,
  Role,
  UpdateShitpostRequestNeo,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { ShitpostsService } from './shitposts.service';

@ApiBearerAuth()
@ApiTags('shitposts')
@Controller('shitposts')
export class ShitpostsController {
  constructor(private readonly shitpostsService: ShitpostsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get a list of all shitposts. Role: Admin' })
  @ApiOkResponse({ type: [ShitpostNeo] })
  async getAll(): Promise<IShitpostNeo[]> {
    return this.shitpostsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a shitpost by id. Role: Admin' })
  @ApiOkResponse({ type: ShitpostNeo })
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<IShitpostNeo> {
    return this.shitpostsService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('shitpost/:shitpost')
  @ApiOperation({ summary: 'Get a a shitpost by shitpost. Role: Admin' })
  @ApiOkResponse({ type: ShitpostNeo })
  getOneByEmail(@Param('shitpost') shitpost: string): Promise<IShitpostNeo> {
    return this.shitpostsService.findOneByEmail(shitpost);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update shitpost by id. Role: Admin' })
  @ApiOkResponse({ type: ShitpostNeo })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateShitpostRequestNeo
  ): Promise<IShitpostNeo> {
    return this.shitpostsService.update(request, id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post()
  @ApiOperation({ summary: 'Create a new shitpost. Role: Admin' })
  @ApiOkResponse({ type: ShitpostNeo })
  create(
    @Body() request: CreateShitpostRequestNeo,
    @AuthUser() user: UserNeo
  ): Promise<IShitpostNeo> {
    return this.shitpostsService.create(request, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific shitpost. Role: Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.shitpostsService.perish(id);
  }
}
