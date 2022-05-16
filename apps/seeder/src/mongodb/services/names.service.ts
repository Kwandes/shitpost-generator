import { NameMongo } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { names } from '../constants/names.constant';

@Injectable()
export class NamesSeederService {
  constructor(
    @InjectRepository(NameMongo)
    private readonly repository: MongoRepository<NameMongo>
  ) {}

  create(): Array<Promise<NameMongo>> {
    return names.map(async (name) => {
      try {
        return await this.repository.save(name);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
