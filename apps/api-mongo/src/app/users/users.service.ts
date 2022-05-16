import { UserMongo } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISignupRequest,
  IUserMongo,
  Role,
} from '@shitpost-generator/interfaces';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserMongo)
    private readonly userRepo: MongoRepository<UserMongo>
  ) {}

  /**
   * Find a singular user by their email.
   * @param email email of the user.
   * @returns user or undefined.
   */
  async findOne(email: string): Promise<UserMongo | undefined> {
    return this.userRepo.findOne({ where: { email: email } });
  }

  /**
   * Create and persist a user entity.
   * @param signupRequestDto information for user creation.
   * @returns created user.
   */
  async create(
    signupRequestDto: ISignupRequest,
    role: Role
  ): Promise<IUserMongo> {
    const { email, password } = signupRequestDto;
    const newUser = this.userRepo.create({
      email: email,
      password: password,
      role: role,
    });
    return this.userRepo.save(newUser);
  }
}
