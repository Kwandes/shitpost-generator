import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateShitpostRequest,
  IShitpost,
  IShitpostTag,
  IUpdateShitpostRequst,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ShitpostTag } from '../models/shitpost-tag.entity';
import { Shitpost } from '../models/shitpost.entity';
import { User } from '../models/user.entity';

@Injectable()
export class ShitpostsService {
  constructor(
    @InjectRepository(Shitpost)
    private readonly shitpostRepo: Repository<Shitpost>,
    @InjectRepository(ShitpostTag)
    private readonly shitpostTagsRepo: Repository<ShitpostTag>
  ) {}

  /**
   * Find a specific entry by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Shitpost> {
    return this.shitpostRepo.findOneOrFail({
      where: { shitpostId: id },
      relations: ['tags'],
    });
  }

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<Shitpost[]> {
    return this.shitpostRepo.find({ relations: ['tags'] });
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(request: IUpdateShitpostRequst, id: string): Promise<IShitpost> {
    const { text, sfw, isEnabled, tags } = request;
    const shitpost = await this.shitpostRepo.findOneOrFail({
      where: { shitpostId: id },
    });

    if (tags) {
      const tagList: IShitpostTag[] = [];
      for (const tag of tags) {
        tagList.push(
          await this.shitpostTagsRepo.findOneOrFail({
            where: { tagId: tag },
          })
        );
      }
      shitpost.tags = tagList;
    }
    shitpost.text = text;
    shitpost.sfw = sfw;
    shitpost.isEnabled = isEnabled;
    return this.shitpostRepo.save(shitpost);
  }

  /**
   * Create and persist a new entity.
   * @param request information about new entity.
   * @param createdBy user that created the entity.
   * @returns created entity.
   */
  async create(
    request: ICreateShitpostRequest,
    createdBy: User = null
  ): Promise<IShitpost> {
    const { text, sfw, tags } = request;
    const tagList: IShitpostTag[] = [];
    for (const tag of tags) {
      tagList.push(
        await this.shitpostTagsRepo.findOneOrFail({
          where: { tagId: tag },
        })
      );
    }

    const newShitpost = this.shitpostRepo.create({
      text: text,
      sfw: sfw,
      createdBy: createdBy,
      tags: tagList,
    });
    return this.shitpostRepo.save(newShitpost);
  }

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.shitpostRepo.delete({
      shitpostId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }
  }
}
