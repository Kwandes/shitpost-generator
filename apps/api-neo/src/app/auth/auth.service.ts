import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ILoginResponse,
  ISignupRequest,
  ISignupResponse,
  IUser,
  Role,
} from '@shitpost-generator/interfaces';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Verify that the the login attempt uses valid user credentials.
   * @param loginRequestDto user credentials.
   * @returns validated user information or null.
   */
  async validateUser(loginRequestDto): Promise<any> {
    const { email, password } = loginRequestDto;
    // const user = await this.usersService.findOne(email);
    // if (user && (await this.compareHashes(password, user.password))) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }

  /**
   * Get a JWT access token for the given user \
   * This method is called internally by the authentication library.
   * @param user user for which the token gets generated.
   * @returns generated JWT.
   */
  async login(user: IUser): Promise<ILoginResponse> {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  /**
   * Register a new user and hash their password.
   * @param signupRequestDto signup information.
   * @returns access token for the registered user.
   */
  async signup(
    signupRequestDto: ISignupRequest,
    role: Role
  ): Promise<ISignupResponse> {
    const { email, password } = signupRequestDto;
    // if ((await this.usersService.findOne(email)) !== undefined) {
    //   throw new BadRequestException(
    //     `This email is already taken. Try adding some random digits to it 👍`
    //   );
    // }
    const hashedPassword = await this.encodePassword(password);
    // const user = await this.usersService.create(
    //   {
    //     email: email,
    //     password: hashedPassword,
    //   },
    //   role
    // );
    // return await this.login(user);
    return null;
  }

  /**
   * Hashes and salts the plaintext password using bcrypt.
   * @param password plaitext password to hash.
   * @returns encoded password.
   */
  async encodePassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  /**
   * Compares the plainttest password and a hash to verify that they match.
   * @param password plaintext password.
   * @param hash password hashed with bcrypt.
   * @returns whether the strings match.
   */
  async compareHashes(password, hash): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
