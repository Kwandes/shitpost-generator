import { Name } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { names } from '../constants/names.constant';

@Injectable()
export class NamesSeederService {
  constructor(
    @InjectRepository(Name)
    private readonly repository: Repository<Name>
  ) {}

  create(): Array<Promise<Name>> {
    return names.map(async (name) => {
      try {
        return await this.repository.save(name);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
