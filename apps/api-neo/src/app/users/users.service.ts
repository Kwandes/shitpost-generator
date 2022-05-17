import { UserNeo } from '@models';
import { Injectable } from '@nestjs/common';
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
  // constructor(
  //   @InjectRepository(UserNeo)
  //   private readonly userRepo: Repository<UserNeo>
  // ) {}
  // /**
  //  * Find a singular user by their email.
  //  * @param email email of the user.
  //  * @returns user or undefined.
  //  */
  // async findOne(email: string): Promise<UserNeo | undefined> {
  //   return this.userRepo.findOne({ where: { email: email } });
  // }
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
