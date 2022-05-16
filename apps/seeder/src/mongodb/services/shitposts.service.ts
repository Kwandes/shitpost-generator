import { ShitpostMongo } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { shitposts } from '../constants/shitposts.constant';

@Injectable()
export class ShitpostsSeederService {
  constructor(
    @InjectRepository(ShitpostMongo)
    private readonly repository: MongoRepository<ShitpostMongo>
  ) {}

  create(): Array<Promise<ShitpostMongo>> {
    return shitposts.map(async (shitpost) => {
      try {
        return await this.repository.save(shitpost);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
