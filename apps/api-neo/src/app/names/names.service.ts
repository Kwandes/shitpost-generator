import { NameNeo } from '@models';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ICreateNameRequestNeo,
  INameNeo,
  IUpdateNameRequstNeo,
  IUserNeo,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError } from 'typeorm';
import { NamesRepository } from './names.repository';

@Injectable()
export class NamesService {
  constructor(readonly namesRepo: NamesRepository) {}

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<NameNeo[]> {
    return this.namesRepo.findAll();
  }

  /**
   * Find a singular name by its id.
   * @param id id of the name.
   * @returns name or undefined.
   */
  async findOneById(id: string): Promise<NameNeo> {
    const name = await this.namesRepo.findOneById(id);
    if (!name) {
      throw new EntityNotFoundError(NameNeo, id);
    }
    return name;
  }

  /**
   * Find a singular name by its text.
   * @param text text of the name.
   * @returns name or undefined.
   */
  async findOneByName(name: string): Promise<NameNeo> {
    const foundname = await this.namesRepo.findOneByName(name);
    if (!foundname) {
      throw new EntityNotFoundError(NameNeo, foundname);
    }
    return foundname;
  }

  /**
   * Update a name by id
   * @param signupRequestDto new name information.
   * @param role what role the name should have
   * @returns updated name.
   */
  async update(request: IUpdateNameRequstNeo, id: string): Promise<INameNeo> {
    // verify the entry exists
    await this.findOneById(id);
    return this.namesRepo.update(request, id);
  }

  /**
   * Create and persist a name entity.
   * @param signupRequestDto information for name creation.
   * @param role what role the name should have
   * @returns created name.
   */
  async create(
    request: ICreateNameRequestNeo,
    createdBy: IUserNeo
  ): Promise<INameNeo> {
    const name = await this.namesRepo.findOneByName(request.name);
    if (name) {
      throw new BadRequestException(
        `This name already exists. Try being a bit more creative 👍`
      );
    }
    return this.namesRepo.create(request, createdBy);
  }

  /**
   * Find a specific name by id.
   * @param id id of the name.
   * @returns void or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    return this.namesRepo.delete(id);
  }
}
