import { TagNeo } from '@models';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ICreateTagNeoRequest,
  ITagNeo,
  IUpdateTagNeoRequest,
  IUserNeo,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError } from 'typeorm';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(readonly tagsRepo: TagsRepository) {}

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<TagNeo[]> {
    return this.tagsRepo.findAll();
  }

  /**
   * Find a singular tag by their email.
   * @param email email of the tag.
   * @returns tag or undefined.
   */
  async findOneById(id: string): Promise<TagNeo> {
    const tag = await this.tagsRepo.findOneById(id);
    if (!tag) {
      throw new EntityNotFoundError(TagNeo, id);
    }
    return tag;
  }

  /**
   * Find a singular tag by their email.
   * @param email email of the tag.
   * @returns tag or undefined.
   */
  async findOneByEmail(tag: string): Promise<TagNeo> {
    const foundtag = await this.tagsRepo.findOneByTag(tag);
    if (!foundtag) {
      throw new EntityNotFoundError(TagNeo, foundtag);
    }
    return foundtag;
  }

  /**
   * Update a tag by id
   * @param signupRequestDto new tag information.
   * @param role what role the tag should have
   * @returns updated tag.
   */
  async update(request: IUpdateTagNeoRequest, id: string): Promise<ITagNeo> {
    return this.tagsRepo.update(request, id);
  }

  /**
   * Create and persist a tag entity.
   * @param signupRequestDto information for tag creation.
   * @param role what role the tag should have
   * @returns created tag.
   */
  async create(
    request: ICreateTagNeoRequest,
    createdBy: IUserNeo
  ): Promise<ITagNeo> {
    const tag = await this.tagsRepo.findOneByTag(request.tag);
    if (tag) {
      throw new BadRequestException(
        `This tag already exists. Try being a bit more creative 👍`
      );
    }
    return this.tagsRepo.create(request, createdBy);
  }

  /**
   * Find a specific tag by id.
   * @param id id of the tag.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    return this.tagsRepo.delete(id);
  }
}
