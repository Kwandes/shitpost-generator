import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  IMessage,
  ISignupRequestDto,
  Role,
} from '@shitpost-generator/interfaces';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { EnumValidationPipe } from './shared/pipes/enum-validation.pipe';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Get('hello')
  getData(): IMessage {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getConfidentialData(): IMessage {
    return { message: 'confidential data' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @Roles(Role.user)
  getUserData(): IMessage {
    return { message: 'User data' };
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('admin')
  getAdminData(): IMessage {
    return { message: 'Admin data' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // uses the passport library logic to obtain the user
    return this.authService.login(req.user);
  }

  // The role query variable could be path of the DTO but this way I get to showcase the custom enum validation pipe :)
  @Post('auth/signup')
  async signup(
    @Body() signupRequestDto: ISignupRequestDto,
    @Query(
      'role',
      new EnumValidationPipe(Role),
      new DefaultValuePipe(Role.user)
    )
    role: Role
  ) {
    return this.authService.signup(signupRequestDto, role);
  }
}
