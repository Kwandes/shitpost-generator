import { UserMongo } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { users } from '../constants/users.constant';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(UserMongo)
    private readonly repository: MongoRepository<UserMongo>
  ) {}

  create(): Array<Promise<UserMongo>> {
    return users.map(async (user) => {
      try {
        return await this.repository.save(user);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
