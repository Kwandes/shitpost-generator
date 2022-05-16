import { NameMongo, UserMongo } from '@models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateNameRequest,
  INameMongo,
  IUpdateNameRequst,
  IUserMongo,
} from '@shitpost-generator/interfaces';
import { Connection, EntityNotFoundError, MongoRepository } from 'typeorm';

@Injectable()
export class NamesService {
  constructor(
    @InjectRepository(NameMongo)
    private readonly nameRepo: MongoRepository<NameMongo>,
    private connection: Connection
  ) {}

  /**
   * Find a specific entry by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<NameMongo> {
    return this.nameRepo.findOneOrFail({
      where: { _id: id },
    });
  }

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<NameMongo[]> {
    return this.nameRepo.find();
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(request: IUpdateNameRequst, id: string): Promise<INameMongo> {
    const { name, gender, isEnabled, tags } = request;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let nameEntity = await this.nameRepo.findOneOrFail({
        where: { _id: id },
      });

      nameEntity.tags = tags;
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
    createdBy: UserMongo = null
  ): Promise<INameMongo> {
    const { name, gender, tags } = request;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let user: IUserMongo = undefined;

      if (createdBy.email) {
        user = await queryRunner.manager.findOneOrFail(UserMongo, {
          email: createdBy.email,
        });
      }
      let newName = queryRunner.manager.create(NameMongo, {
        name: name,
        gender: gender,
        createdBy: user ? user : null,
        tags: tags,
        isEnabled: user ? true : false,
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
      await queryRunner.release();
    }
  }

  /**
   * Find a specific entity by its id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.nameRepo.delete({
      id: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(NameMongo, id);
    }
  }
}
