import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISignupRequest, IUser, Role } from '@shitpost-generator/interfaces';
import { MongoRepository } from 'typeorm';
import { User } from '../models';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: MongoRepository<User>
  ) {}

  /**
   * Find a singular user by their email.
   * @param email email of the user.
   * @returns user or undefined.
   */
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email: email } });
  }

  /**
   * Create and persist a user entity.
   * @param signupRequestDto information for user creation.
   * @returns created user.
   */
  async create(signupRequestDto: ISignupRequest, role: Role): Promise<IUser> {
    const { email, password } = signupRequestDto;
    const newUser = this.userRepo.create({
      email: email,
      password: password,
      role: role,
    });
    return this.userRepo.save(newUser);
  }
}
