import { UserNeo } from '@models';
import { Injectable } from '@nestjs/common';
import {
  ISignupRequest,
  IUpdateUserNeoRequest,
  IUserNeo,
  Role,
} from '@shitpost-generator/interfaces';
import * as bcrypt from 'bcrypt';
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

  /**
   * Update a user by id
   * @param signupRequestDto new user information.
   * @param role what role the user should have
   * @returns updated user.
   */
  async update(request: IUpdateUserNeoRequest, id: string): Promise<IUserNeo> {
    const { email, password, role } = request;
    const hashedPassword = await this.encodePassword(password);
    return this.usersRepo.update({ email, password: hashedPassword, role }, id);
  }

  /**
   * Create and persist a user entity.
   * @param signupRequestDto information for user creation.
   * @param role what role the user should have
   * @returns created user.
   */
  async create(
    signupRequestDto: ISignupRequest,
    role: Role
  ): Promise<IUserNeo> {
    const { email, password } = signupRequestDto;
    return this.usersRepo.create(
      {
        email: email,
        password: password,
      },
      role
    );
  }

  /**
   * Find a specific user by id.
   * @param id id of the user.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    return this.usersRepo.delete(id);
  }

  // Yes, it's a copy of authService's encodePassword method
  /**
   * Hashes and salts the plaintext password using bcrypt.
   * @param password plaitext password to hash.
   * @returns encoded password.
   */
  async encodePassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
