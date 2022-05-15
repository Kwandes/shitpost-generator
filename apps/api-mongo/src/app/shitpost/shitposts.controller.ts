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
  CreateShitpostRequest,
  ICreateShitpostResponse,
  IShitpost,
  Role,
  UpdateShitpostRequest,
} from '@shitpost-generator/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { Shitpost, User } from '../models';
import { ParseObjectIdPipe } from '../shared/pipes/object-id-validation.pipe';
import { ShitpostsService } from './shitposts.service';

@ApiBearerAuth()
@ApiTags('shitposts')
@Controller('shitposts')
export class ShitpostsController {
  constructor(private readonly shitpostsService: ShitpostsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get a list of all shitposts. Role: Admin' })
  @ApiOkResponse({ type: [Shitpost] })
  async getAll(): Promise<IShitpost[]> {
    return this.shitpostsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a shitpost by id. Role: Admin' })
  @ApiOkResponse({ type: Shitpost })
  get(@Param('id', ParseObjectIdPipe) id: string): Promise<IShitpost> {
    return this.shitpostsService.findOne(id);
  }

  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post('')
  @ApiOperation({
    summary:
      'Create a new shitpost entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: Shitpost })
  create(
    @Body() createShitpostRequest: CreateShitpostRequest,
    @AuthUser() user: User
  ): Promise<ICreateShitpostResponse> {
    return this.shitpostsService.create(createShitpostRequest, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update shitpost by id. Role: Admin' })
  @ApiOkResponse({ type: Shitpost })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateRequest: UpdateShitpostRequest
  ): Promise<IShitpost> {
    return this.shitpostsService.update(updateRequest, id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific shitpost. Role: Admin',
  })
  delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.shitpostsService.perish(id);
  }
}
