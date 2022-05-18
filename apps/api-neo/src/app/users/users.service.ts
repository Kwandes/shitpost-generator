import { UserNeo } from '@models';
import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(readonly usersRepo: UsersRepository) {}

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<UserNeo[]> {
    return this.usersRepo.findAll();
  }

  /**
   * Find a singular user by their email.
   * @param email email of the user.
   * @returns user or undefined.
   */
  async findOneById(id: string): Promise<UserNeo> {
    const user = await this.usersRepo.findOneById(id);
    if (!user) {
      throw new EntityNotFoundError(UserNeo, id);
    }
    return user;
  }

  /**
   * Find a singular user by their email.
   * @param email email of the user.
   * @returns user or undefined.
   */
  async findOneByEmail(email: string): Promise<UserNeo> {
    const user = await this.usersRepo.findOneByEmail(email);
    if (!user) {
      throw new EntityNotFoundError(UserNeo, email);
    }
    return user;
  }
  // /**
  //  * Create and persist a user entity.
  //  * @param signupRequestDto information for user creation.
  //  * @returns created user.
  //  */
  // async create(signupRequestDto: ISignupRequest, role: Role): Promise<IUser> {
  //   const { email, password } = signupRequestDto;
  //   const newUser = this.userRepo.create({
  //     email: email,
  //     password: password,
  //     role: role,
  //   });
  //   return this.userRepo.save(newUser);
  // }
}
