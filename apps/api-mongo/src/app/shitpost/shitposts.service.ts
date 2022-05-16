import { ShitpostMongo, UserMongo } from '@models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateShitpostRequestMongo,
  IShitpostMongo,
  IUpdateShitpostRequstMongo,
  IUserMongo,
} from '@shitpost-generator/interfaces';
import { Connection, EntityNotFoundError, MongoRepository } from 'typeorm';

@Injectable()
export class ShitpostsService {
  constructor(
    @InjectRepository(ShitpostMongo)
    private readonly shitpostRepo: MongoRepository<ShitpostMongo>,
    private connection: Connection
  ) {}

  /**
   * Find a specific entry by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<ShitpostMongo> {
    return this.shitpostRepo.findOneOrFail({
      where: { _id: id },
      relations: ['tags'],
    });
  }

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<ShitpostMongo[]> {
    return this.shitpostRepo.find({ relations: ['tags'] });
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(
    request: IUpdateShitpostRequstMongo,
    id: string
  ): Promise<IShitpostMongo> {
    const { text, sfw, isEnabled, tags } = request;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let shitpost = await this.shitpostRepo.findOneOrFail({
        where: { _id: id },
      });

      shitpost.tags = tags;
      shitpost.text = text;
      shitpost.sfw = sfw;
      shitpost.isEnabled = isEnabled;
      shitpost = await queryRunner.manager.save(shitpost);
      await queryRunner.commitTransaction();
      return shitpost;
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
    request: ICreateShitpostRequestMongo,
    createdBy: UserMongo = null
  ): Promise<IShitpostMongo> {
    const { text, sfw, tags } = request;

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

      let newShitpost = queryRunner.manager.create(ShitpostMongo, {
        text: text,
        sfw: sfw,
        createdBy: user ? user : null,
        tags: tags,
        isEnabled: user ? true : false,
      });
      newShitpost = await queryRunner.manager.save(newShitpost);
      await queryRunner.commitTransaction();
      return newShitpost;
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
    const response = await this.shitpostRepo.delete({
      id: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(ShitpostMongo, id);
    }
  }
}
