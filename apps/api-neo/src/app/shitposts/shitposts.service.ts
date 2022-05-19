import { ShitpostNeo } from '@models';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ICreateShitpostRequestNeo,
  IShitpostNeo,
  IUpdateShitpostRequstNeo,
  IUserNeo,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError } from 'typeorm';
import { ShitpostsRepository } from './shitposts.repository';

@Injectable()
export class ShitpostsService {
  constructor(readonly shitpostsRepo: ShitpostsRepository) {}

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<ShitpostNeo[]> {
    return this.shitpostsRepo.findAll();
  }

  /**
   * Find a singular shitpost by its id.
   * @param id id of the shitpost.
   * @returns shitpost or undefined.
   */
  async findOneById(id: string): Promise<ShitpostNeo> {
    const shitpost = await this.shitpostsRepo.findOneById(id);
    if (!shitpost) {
      throw new EntityNotFoundError(ShitpostNeo, id);
    }
    return shitpost;
  }

  /**
   * Find a singular shitpost by its text.
   * @param text text of the shitpost.
   * @returns shitpost or undefined.
   */
  async findOneByEmail(text: string): Promise<ShitpostNeo> {
    const foundshitpost = await this.shitpostsRepo.findOneByText(text);
    if (!foundshitpost) {
      throw new EntityNotFoundError(ShitpostNeo, foundshitpost);
    }
    return foundshitpost;
  }

  /**
   * Update a shitpost by id
   * @param signupRequestDto new shitpost information.
   * @param role what role the shitpost should have
   * @returns updated shitpost.
   */
  async update(
    request: IUpdateShitpostRequstNeo,
    id: string
  ): Promise<IShitpostNeo> {
    // verify the entry exists
    await this.findOneById(id);
    return this.shitpostsRepo.update(request, id);
  }

  /**
   * Create and persist a shitpost entity.
   * @param signupRequestDto information for shitpost creation.
   * @param role what role the shitpost should have
   * @returns created shitpost.
   */
  async create(
    request: ICreateShitpostRequestNeo,
    createdBy: IUserNeo
  ): Promise<IShitpostNeo> {
    const shitpost = await this.shitpostsRepo.findOneByText(request.text);
    if (shitpost) {
      throw new BadRequestException(
        `This shitpost already exists. Try being a bit more creative 👍`
      );
    }
    return this.shitpostsRepo.create(request, createdBy);
  }

  /**
   * Find a specific shitpost by id.
   * @param id id of the shitpost.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    return this.shitpostsRepo.delete(id);
  }
}
