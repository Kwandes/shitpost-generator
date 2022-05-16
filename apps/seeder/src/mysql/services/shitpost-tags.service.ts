import { ShitpostTag } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { shitpostTags } from '../constants/shitpost-tags.constant';

@Injectable()
export class ShitpostTagsSeederService {
  constructor(
    @InjectRepository(ShitpostTag)
    private readonly repository: Repository<ShitpostTag>
  ) {}

  create(): Array<Promise<ShitpostTag>> {
    const tagList = [
      shitpostTags.scifi,
      shitpostTags.religion,
      shitpostTags.games,
      shitpostTags.anime,
      shitpostTags.schoolLife,
      shitpostTags.nerd,
      shitpostTags.ttrpg,
      shitpostTags.cursed,
      shitpostTags.music,
      shitpostTags.food,
      shitpostTags.random,
    ];
    return tagList.map(async (tag) => {
      try {
        return await this.repository.save(tag);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
