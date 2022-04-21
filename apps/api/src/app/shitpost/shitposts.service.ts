import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateShitpostRequest,
  IShitpost,
} from '@shitpost-generator/interfaces';
import { Repository } from 'typeorm';
import { Shitpost } from '../models/shitpost.entity';
import { User } from '../models/user.entity';

@Injectable()
export class ShitpostsService {
  constructor(
    @InjectRepository(Shitpost)
    private readonly shitpostRepo: Repository<Shitpost>
  ) {}

  async findOne(shitpostId: string): Promise<Shitpost> {
    return this.shitpostRepo.findOne({ where: { shitpostId: shitpostId } });
  }

  async findAll(): Promise<Shitpost[]> {
    return this.shitpostRepo.find();
  }

  async create(
    createShitpostRequest: ICreateShitpostRequest,
    createdBy: User = null
  ): Promise<IShitpost> {
    const { text, sfw } = createShitpostRequest;
    const newShitpost = this.shitpostRepo.create({
      text: text,
      sfw: sfw,
      createdBy: createdBy,
    });
    return this.shitpostRepo.save(newShitpost);
  }
}
