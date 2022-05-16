import { Name, NameTag, User } from '@models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateNameRequest,
  IName,
  INameTag,
  IUpdateNameRequst,
} from '@shitpost-generator/interfaces';
import { Connection, EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class NamesService {
  constructor(
    @InjectRepository(Name)
    private readonly nameRepo: Repository<Name>,
    @InjectRepository(NameTag)
    private readonly nameTagsRepo: Repository<NameTag>,
    private connection: Connection
  ) {}

  /**
   * Find a specific entry by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<Name> {
    return this.nameRepo.findOneOrFail({
      where: { nameId: id },
      relations: ['tags'],
    });
  }

  /**
   * Find all entries.
   * @returns a list of entities.
   */
  async findAll(): Promise<Name[]> {
    return this.nameRepo.find({ relations: ['tags'] });
  }

  /**
   * Update the given entity.
   * @param request new entiy information.
   * @param id the id of the entity to update.
   * @returns updated entity.
   */
  async update(request: IUpdateNameRequst, id: string): Promise<IName> {
    const { name, gender, isEnabled, tags } = request;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let nameEntity = await this.nameRepo.findOneOrFail({
        where: { nameId: id },
      });

      if (tags) {
        const tagList: INameTag[] = [];
        for (const tag of tags) {
          tagList.push(
            await this.nameTagsRepo.findOneOrFail({
              where: { tagId: tag },
            })
          );
        }
        nameEntity.tags = tagList;
      }
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
    const { name, gender, tags } = request;
    const tagList: INameTag[] = [];

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const tag of tags) {
        tagList.push(
          await queryRunner.manager.findOneOrFail(NameTag, {
            where: { tagId: tag },
          })
        );
      }

      let newName = queryRunner.manager.create(Name, {
        name: name,
        gender: gender,
        createdBy: createdBy,
        tags: tagList,
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
      nameId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(User, id);
    }
  }
}
