import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateNameTagRequest,
  INameTag,
  IUpdateNameTagRequest,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError, MongoRepository } from 'typeorm';
import { NameTag, User } from '../models';

@Injectable()
export class NameTagsService {
  constructor(
    @InjectRepository(NameTag)
    private readonly nameTagsRepo: MongoRepository<NameTag>
  ) {}

  /**
   * Find a specific entry by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<NameTag> {
    return this.nameTagsRepo.findOneOrFail({ where: { tagId: id } });
  }

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<NameTag[]> {
    return this.nameTagsRepo.find();
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(request: IUpdateNameTagRequest, id: string): Promise<INameTag> {
    const { tag, sfw } = request;
    const nameTag = await this.nameTagsRepo.findOneOrFail({
      where: { nameId: id },
    });
    nameTag.tag = tag;
    nameTag.sfw = sfw;
    return this.nameTagsRepo.save(nameTag);
  }

  /**
   * Create and persist a new entity.
   * @param request information about new entity.
   * @param createdBy user that created the entity.
   * @returns created entity.
   */
  async create(
    request: ICreateNameTagRequest,
    createdBy: User = null
  ): Promise<INameTag> {
    const { tag, sfw } = request;
    if (
      (await this.nameTagsRepo.findOne({ where: { tag: tag } })) !== undefined
    ) {
      throw new BadRequestException(
        'This tag already exists. Get more creative!'
      );
    }
    const newTag = this.nameTagsRepo.create({
      tag: tag,
      sfw: sfw,
      createdBy: createdBy,
    });
    return this.nameTagsRepo.save(newTag);
  }

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.nameTagsRepo.delete({
      tagId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }
  }
}
