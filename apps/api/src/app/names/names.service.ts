import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateNameRequest,
  IName,
  IUpdateNameRequst,
} from '@shitpost-generator/interfaces';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';
import { Name } from '../models/name.entity';
import { User } from '../models/user.entity';

@Injectable()
export class NamesService {
  constructor(
    @InjectRepository(Name)
    private readonly namesRepo: Repository<Name>,
    private connection: Connection
  ) {}

  /**
   * Find a specific entry by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Name> {
    return this.namesRepo.findOneOrFail({
      where: { nameId: id },
    });
  }

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<Name[]> {
    return this.namesRepo.find({ relations: ['tags'] });
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(request: IUpdateNameRequst, id: string): Promise<IName> {
    const { name, gender, isEnabled } = request;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let nameEntity = await this.namesRepo.findOneOrFail({
        where: { nameId: id },
      });

      nameEntity.name = name;
      nameEntity.gender = gender;
      nameEntity.isEnabled = isEnabled;
      nameEntity = await queryRunner.manager.save(nameEntity);
      await queryRunner.commitTransaction();
      return nameEntity;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      Logger.warn(err);
      throw err;
      // console.warn(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  /**
   * Create and persist a new entity.
   * @param request information about new entity.
   * @param createdBy user that created the entity.
   * @returns created entity.
   */
  async create(
    request: ICreateNameRequest,
    createdBy: User = null
  ): Promise<IName> {
    const { name, gender, isEnabled } = request;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let newName = queryRunner.manager.create(Name, {
        name: name,
        gender: gender,
        isEnabled: isEnabled,
        createdBy: createdBy,
      });
      newName = await queryRunner.manager.save(newName);
      await queryRunner.commitTransaction();
      return newName;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      Logger.warn(err);
      throw err;
      // console.warn(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      console.log('release');

      await queryRunner.release();
    }
  }

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.namesRepo.delete({
      nameId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }
  }
}
