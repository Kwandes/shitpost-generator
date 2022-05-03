import { NameTag } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nameTags } from '../constants/name-tags.constant copy';

@Injectable()
export class NameTagsSeederService {
  constructor(
    @InjectRepository(NameTag)
    private readonly repository: Repository<NameTag>
  ) {}

  create(): Array<Promise<NameTag>> {
    const tagList = [
      nameTags.scifi,
      nameTags.religion,
      nameTags.games,
      nameTags.anime,
      nameTags.nerd,
      nameTags.ttrpg,
      nameTags.cursed,
      nameTags.music,
      nameTags.random,
      nameTags.harryPotter,
      nameTags.animals,
      nameTags.robot,
      nameTags.latin,
      nameTags.food,
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
