import { Shitpost } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { shitposts } from '../constants/shitposts.constant';

@Injectable()
export class ShitpostsSeederService {
  constructor(
    @InjectRepository(Shitpost)
    private readonly repository: Repository<Shitpost>
  ) {}

  create(): Array<Promise<Shitpost>> {
    return shitposts.map(async (shitpost) => {
      try {
        return await this.repository.save(shitpost);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
