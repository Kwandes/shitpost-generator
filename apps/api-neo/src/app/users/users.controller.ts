import { User, UserNeo } from '@models';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IUser, IUserNeo, Role } from '@shitpost-generator/interfaces';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/user.decorator';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOperation({ summary: 'Get a list of all users. Role: Admin' })
  @ApiOkResponse({ type: [UserNeo] })
  async getAll(): Promise<IUserNeo[]> {
    return this.usersService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get a a user by id. Role: Admin' })
  @ApiOkResponse({ type: User })
  getOneById(@Param('id', ParseUUIDPipe) id: string): Promise<IUserNeo> {
    return this.usersService.findOneById(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('email/:email')
  @ApiOperation({ summary: 'Get a a user by email. Role: Admin' })
  @ApiOkResponse({ type: User })
  getOneByEmail(@Param('email') email: string): Promise<IUserNeo> {
    return this.usersService.findOneByEmail(email);
  }

  // @UseGuards(AuthGuard(['jwt', 'anonymous']))
  @Post('')
  @ApiOperation({
    summary:
      'Create a new user entry. Can be done with authorized or anonymous',
  })
  @ApiOkResponse({ type: User })
  create(
    // @Body() createUserRequest: ,
    @AuthUser() user: User
  ): Promise<IUser> {
    // return this.usersService.create(createUserRequest, user);
    return null;
  }

  //@UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update user by id. Role: Admin' })
  @ApiOkResponse({ type: User })
  update(
    @Param('id', ParseUUIDPipe) id: string
    // @Body() updateRequest: UpdateUserRequest
  ): Promise<IUser> {
    // return this.usersService.update(updateRequest, id);
    return null;
  }

  //@UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a specific user. Role: Admin',
  })
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    // return this.usersService.perish(id);
    return;
  }
}
