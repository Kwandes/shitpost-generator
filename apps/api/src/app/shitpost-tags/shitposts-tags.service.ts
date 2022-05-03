import { ShitpostTag, User } from '@models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateShitpostTagRequest,
  IShitpostTag,
  IUpdateShitpostTagRequst,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ShitpostTagsService {
  constructor(
    @InjectRepository(ShitpostTag)
    private readonly shitpostTagsRepo: Repository<ShitpostTag>
  ) {}

  /**
   * Find a specific entry by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<ShitpostTag> {
    return this.shitpostTagsRepo.findOneOrFail({ where: { tagId: id } });
  }

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<ShitpostTag[]> {
    return this.shitpostTagsRepo.find();
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(
    request: IUpdateShitpostTagRequst,
    id: string
  ): Promise<IShitpostTag> {
    const { tag, sfw } = request;
    const shitpostTag = await this.shitpostTagsRepo.findOneOrFail({
      where: { shitpostId: id },
    });
    shitpostTag.tag = tag;
    shitpostTag.sfw = sfw;
    return this.shitpostTagsRepo.save(shitpostTag);
  }

  /**
   * Create and persist a new entity.
   * @param request information about new entity.
   * @param createdBy user that created the entity.
   * @returns created entity.
   */
  async create(
    request: ICreateShitpostTagRequest,
    createdBy: User = null
  ): Promise<IShitpostTag> {
    const { tag, sfw } = request;
    if (
      (await this.shitpostTagsRepo.findOne({ where: { tag: tag } })) !==
      undefined
    ) {
      throw new BadRequestException(
        'This tag already exists. Get more creative!'
      );
    }
    const newTag = this.shitpostTagsRepo.create({
      tag: tag,
      sfw: sfw,
      createdBy: createdBy,
    });
    return this.shitpostTagsRepo.save(newTag);
  }

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.shitpostTagsRepo.delete({
      tagId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }
  }
}
